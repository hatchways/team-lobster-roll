import axios from "axios";

export const createColumn = (data) => {
  try {
    const URL = `${window.location.origin}/api/column/`;
    axios.post(URL, data);
  } catch (err) {
    console.error(err);
  }
};

export const deleteColumn = async (boardId, columnId) => {
	try {
		const res = await axios.delete(`${window.location.origin}/api/column/delete/`,
			{
				boardId,
				columnId
			}
		);
		
		console.log(res);
		
	} catch (err) {
		console.error(err);
	}
};
