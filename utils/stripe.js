import { loadStripe } from "@stripe/stripe-js";

let stripePromise;
const stripePK = process.env.NEXT_PUBLIC_APP_STRIPE_PUBLIC_KEY;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePK);
  }
  return stripePromise;
};

export default getStripe;
