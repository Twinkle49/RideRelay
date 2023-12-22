import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Map from "./component/Map";
import { useRouter } from "next/router";
import RideSelector from "./component/RideSelector";
import Link from "next/link";
import Payment from "./component/Stripepayment";

const Confirm = () => {
  const router = useRouter();
  const { pickup, dropoff } = router.query;

  console.log("Pickup", pickup);
  console.log("Dropoff", dropoff);

  const [pickupCoordinates, setPickupCoordinates] = useState([0, 0]);
  const [dropoffCoordinates, setDropoffCoordinates] = useState([0, 0]);
  const [selectedCar, setSelectedCar] = useState(null); 
  const [rideAmount, setRideAmount] = useState(0); 
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  const getPickupCoordinates = (pickup) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiYWJoaWtkYXM3NDIxIiwiYSI6ImNrdm0zeHd0djNtOHQzMXBnbHJqdm5heWsifQ.HnWIyuSx-FU8CUObGzMgcg",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setPickupCoordinates(data.features[0].center);
      });
  };

  const getDropoffCoordinates = (dropoff) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiYWJoaWtkYXM3NDIxIiwiYSI6ImNrdm0zeHd0djNtOHQzMXBnbHJqdm5heWsifQ.HnWIyuSx-FU8CUObGzMgcg",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setDropoffCoordinates(data.features[0].center);
      });
  };

  useEffect(() => {
    getPickupCoordinates(pickup);
    getDropoffCoordinates(dropoff);
  }, [pickup, dropoff]);

  const handleConfirmClick = () => {
   
    if (selectedCar) {
      const amount = rideAmount + selectedCar.multiplier;
      setRideAmount(amount);
    }

    setIsPaymentConfirmed(true);
  };

  const handleCarSelect = (car) => {
    
    setSelectedCar(car);
  };

  return (
    <Wrapper>
      <Link href="/search">
        <ButtonContainer>
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </ButtonContainer>
      </Link>
      <Map
        pickupCoordinates={pickupCoordinates}
        dropoffCoordinates={dropoffCoordinates}
      />

      <RideContainer>
        <RideSelector
          pickupCoordinates={pickupCoordinates}
          dropoffCoordinates={dropoffCoordinates}
          onSelectCar={handleCarSelect}
        />

        {isPaymentConfirmed ? (
          <Payment amount={rideAmount} />
        ) : (
          <ConfirmButtonContainer>
            <h2>Payment for</h2>
            <ConfirmButton onClick={handleConfirmClick}>
              Confirm RideX
            </ConfirmButton>
          </ConfirmButtonContainer>
        )}
      </RideContainer>
    </Wrapper>
  );
};

export default Confirm;

const Wrapper = tw.div`
    flex flex-col h-screen
`;

const RideContainer = tw.div`
    flex-1 flex flex-col h-1/2
`;

const ConfirmButtonContainer = tw.div`
	border-t-2
`;

const ConfirmButton = tw.div`
	bg-black text-white m-4 py-3 text-center text-xl rounded-full cursor-pointer
`;

const ButtonContainer = tw.div`
	rounded-full absolute z-10 top-3 left-3 shadow-md
`;

const BackButton = tw.img`
	h-10 cursor-pointer bg-white bg-opacity-60 rounded-full 
`;