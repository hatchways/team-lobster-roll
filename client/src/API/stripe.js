import axios from "axios";

export const createPayment = async (data) => {
  try {
    const URL = `${window.location.origin}/api/stripe/payment`;
    return await axios.post(URL, data);
  } catch (err) {
    console.error(err);
  }
};
