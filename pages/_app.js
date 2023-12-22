import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import '../styles/globals.css'; // Import your global styles here
import 'tailwindcss/tailwind.css';
import 'mapbox-gl/dist/mapbox-gl.css';

// Replace 'YOUR_STRIPE_PUBLISHABLE_KEY' with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_51OEsr1SIB4t3tc2xUIQXPLDQzOtXDcbTMrXMLXniidqOVGQ7ofiiKmM6zjp231wKmAE2NXroVk3604a1VEN80AEe00VoTkHYjT');

function MyApp({ Component, pageProps }) {
  return (
    <Elements stripe={stripePromise}>
      <Component {...pageProps} />
    </Elements>
  );
}

export default MyApp;
