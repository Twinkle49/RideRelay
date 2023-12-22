import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import tw from 'tailwind-styled-components';

const StripePayment = ({ date,time,setIsReserved }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Create a payment method
    const { token, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: name,
        phone: mobile,
      },
    });

    if (error) {
      console.error(error);
      setPaymentError(error.message);
    } else {
      console.log('Payment successful!', token);
      // Handle payment success (e.g., set state or call a server endpoint)
      setIsPaymentConfirmed(true);
      setIsReserved(true);
    }
  };

  return (
    <PaymentContainer>
      {isPaymentConfirmed ? (
        <SuccessMessage>
          <h2>Ride Confirmed!</h2>
          <p>Thank you for confirming your payment!</p>
          {/* Add ride details here */}
          <p>Date: {new Date().toLocaleDateString()}</p>
          <p>Time: {new Date().toLocaleTimeString()}</p>
          {/* Add more ride details as needed */}
        </SuccessMessage>
      ) : (
        <Form onSubmit={handlePaymentSubmit}>
          <Title>Payment Confirmation</Title>
          <Label>
            <LabelText>Name</LabelText>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Label>
          <Label>
            <LabelText>Mobile Number</LabelText>
            <Input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </Label>
          <CardElementContainer>
            <CardElement />
          </CardElementContainer>
          <SubmitButton type="submit">Confirm Payment</SubmitButton>
        </Form>
      )}
      {paymentError && <ErrorText>{paymentError}</ErrorText>}
    </PaymentContainer>
  );
};

export default StripePayment;

const PaymentContainer = tw.div`
  text-center
`;

const Form = tw.form`
  mx-auto max-w-md p-6 bg-white rounded-md shadow-md
`;

const Title = tw.h2`
  text-2xl font-bold mb-4 text-gray-800
`;

const Label = tw.label`
  block text-left mt-4 text-gray-700
`;

const LabelText = tw.span`
  block text-sm font-semibold text-gray-600 mt-1
`;

const Input = tw.input`
  w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500
`;

const CardElementContainer = tw.div`
  mt-4
`;

const SubmitButton = tw.button`
  w-full bg-blue-500 text-white px-4 py-2 mt-6 rounded-full cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600
`;

const ErrorText = tw.div`
  text-red-500 mt-2
`;

const SuccessMessage = tw.div`
  text-center
  h-40
  flex
  flex-col
  justify-center
  items-center
  bg-green-500
  text-white
  rounded-md
  p-4
  mt-4
`;
