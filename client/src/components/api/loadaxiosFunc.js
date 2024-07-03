import axios from "axios";

// const api = "https://192.168.121.108:5000/api/users";
const api = "http://127.0.0.1:5000/api";

export const play = async (data) => {
  try {
    const response = await axios.post(`${api}/play`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("play", response);
    return response.data;
  } catch (error) {
    console.error("Error sending data to backend:", error);
  }
};

export const users = async (data) => {
  try {
    const response = await axios.post(`${api}/users`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("users", response);
    return response.data;
  } catch (error) {
    console.error("Error sending data to backend:", error);
  }
};
