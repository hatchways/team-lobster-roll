import axios from "axios";

export const createCard = (data) => {
  try {
    const URL = `${window.location.origin}/api/card/`;
    axios.post(URL, data);
  } catch (err) {
    console.error(err);
  }
};
