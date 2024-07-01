import axios from "axios";

export const fetchData = async (owner) => {
  try {
    const response = await axios.post(`https://api.example.com/owner/${owner}`);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const sendDataToBackend = async (data) => {
  // const data = { owner: 'John Doe' };

  try {
    const response = await axios.post("http://example.com/api/endpoint", data);
    return response.data;
  } catch (error) {
    console.error("Error sending data to backend:", error);
  }
};
