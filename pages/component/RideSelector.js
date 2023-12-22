import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { carList } from "../data/carList";

const RideSelector = ({ pickupCoordinates, dropoffCoordinates }) => {
  const [rideDuration, setRideDuration] = useState(0);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?access_token=pk.eyJ1IjoiYWJoaWtkYXM3NDIxIiwiYSI6ImNrdm0zeHd0djNtOHQzMXBnbHJqdm5heWsifQ.HnWIyuSx-FU8CUObGzMgcg`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.routes && data.routes[0]) {
          const durationInMinutes = data.routes[0].duration / 60;
          setRideDuration(durationInMinutes);
        } else {
          console.error("Invalid response from Mapbox API:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data from Mapbox API:", error);
      });
  }, [pickupCoordinates, dropoffCoordinates]);

  const handleCarSelect = (car) => {
    console.log(`Selected ${car.service}`);
    setSelectedCar(car);
  };

  return (
    <Wrapper>
      <Title>Choose a ride, or swipe up for more</Title>

      <CarList>
        {carList.map((car, index) => (
          <Car key={index} onClick={() => handleCarSelect(car)}>
            <CarImage src={car.imgUrl} />
            <CarDetails>
              <Service>{car.service}</Service>
              <Time>{`${rideDuration} min away`}</Time>
            </CarDetails>
            <Price>{"₹" + (rideDuration * car.multiplier).toFixed(2)}</Price>
          </Car>
        ))}
      </CarList>

      {selectedCar && (
        <SelectedCarInfo>
          <h2>Selected Car: {selectedCar.service}</h2>
          <p>Price: ₹{(rideDuration * selectedCar.multiplier).toFixed(2)}</p>
          {/* Add any other details you want to display */}
        </SelectedCarInfo>
      )}
    </Wrapper>
  );
};

export default RideSelector;

const Wrapper = tw.div`
    flex-1 flex flex-col overflow-y-auto
`;

const Title = tw.div`
    text-gray-500 text-center text-xs py-2 border-b-2
`;

const CarList = tw.div`
    overflow-y-auto
`;

const Car = tw.div`
    flex p-4 items-center cursor-pointer
`;

const CarImage = tw.img`
    h-14 mr-4
`;

const CarDetails = tw.div`
    flex-1 mt-3 pl-2
`;

const Service = tw.div`
    font-bold
`;

const Time = tw.div`
   text-xs text-blue-700 font-semibold
`;

const Price = tw.div`
    font-bold text-center
`;

const SelectedCarInfo = tw.div`
    mt-4 p-4 bg-gray-200 rounded
`;
