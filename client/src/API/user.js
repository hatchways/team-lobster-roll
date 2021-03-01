import axios from "axios";

export const getUser = async (userId) => {
  try {
    const URL = `${window.location.origin}/user/${userId}`;
    return await axios.get(URL);
  } catch (err) {
    console.error(err);
  }
};
