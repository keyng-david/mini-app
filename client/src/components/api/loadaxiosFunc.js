import axios from "axios";

const api = "https://192.168.121.108:5000/api/users";

// export const fetchData = async (owner) => {
//   try {
//     const response = await axios.post(`https://api.example.com/owner/${owner}`);

//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const sendDataToBackend = async (data) => {
  // const data = { owner: 'John Doe' };

  try {
    const response = await axios.post(api, data);
    return response.data;
  } catch (error) {
    console.error("Error sending data to backend:", error);
  }
};
