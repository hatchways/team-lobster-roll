import axios from "axios";

export const createBoard = (data) => {
  try {
    const URL = `${window.location.origin}/api/board/`;
    axios.post(URL, data);
  } catch (err) {
    console.error(err);
  }
};

export const getBoard = async (boardId) => {
  try {
    const URL = `${window.location.origin}/api/board/${boardId}`;
    return await axios.get(URL);
  } catch (err) {
    console.error(err);
  }
};
