import axios from "axios";

const api = "http://127.0.0.1:5000/api";

export const users = async (data: any) => {
  try {
    const response = await axios.post(`${api}/users`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("users", response);
    return response.data;
  } catch (error) {
    console.error("Error sending data to backend:", error);
  }
};
