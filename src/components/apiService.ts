import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const startScan = async (name: string, url: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/dast`,
      { name, url }, 
      {
        headers: {
          "Content-Type": "application/json", 
        },
      }
    );
    return response.data; 
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getScanStatus = async (scanId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/scan/${scanId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; 
  } catch (error: any) {
    throw new Error(error);
  }
};
