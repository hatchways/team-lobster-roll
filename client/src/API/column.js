import axios from "axios";

export const createColumn = (data) => {
  try {
    const URL = `${window.location.origin}/api/column/`;
    axios.post(URL, data);
  } catch (err) {
    console.error(err);
  }
};
