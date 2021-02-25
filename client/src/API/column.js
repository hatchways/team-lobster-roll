import axios from "axios";

export const createColumn = (data) => {
  try {
    const URL = `${window.location.origin}/api/column/`;
    axios.post(URL, data);
  } catch (err) {
    console.error(err);
  }
};

export const deleteColumn = (boardId, columnId) => {
	try {
		axios.delete(`${window.location.origin}/api/column/delete/`,
			{
				data: {
					boardId,
					columnId
				}
			}
		);
	} catch (err) {
		console.error(err);
	}
};
