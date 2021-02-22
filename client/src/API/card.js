import axios from "axios";

export const createCard = (data) => {
  try {
    const URL = `${window.location.origin}/api/card/`;
    axios.post(URL, data);
  } catch (err) {
    console.error(err);
  }
};

export const updateCard = async (property, newData) => {
	try {
		// axios param id will eventually be data._id
		const res = await axios.put(`${window.location.origin}/api/card/update/6032f763e6dc8567d992b41a`, {
			property,
			newData
		});
		return res;		
	} catch (err) {
		console.error(err);
	}
};