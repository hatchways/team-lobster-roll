import axios from "axios";

export const createCard = (data) => {
  try {
    const URL = `${window.location.origin}/api/card/`;
    axios.post(URL, data);
  } catch (err) {
    console.error(err);
  }
};

export const updateCard = async (data) => {
  try {
    const { cardId, property, newData } = data;
    const res = await axios.put(
      `${window.location.origin}/api/card/update/${cardId}`,
      {
        property,
        newData,
      }
    );
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const deleteCard = async (boardId, cardId) => {
  try {
    const res = await axios.delete(
      `${window.location.origin}/api/card/delete/`,
      {
        data: {
          boardId,
          cardId,
        },
      }
    );
    return res.status;
  } catch (err) {
    console.error(err);
  }
};
