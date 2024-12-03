import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// Memulai scan baru
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
    throw new Error(error.response?.data?.error || error.message);
  }
};

// Mendapatkan status scan berdasarkan ID
export const getScanStatus = async (scanId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/scan/${scanId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; 
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// Mendapatkan semua daftar scan
export const getAllScans = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/scans`, {
      headers: {
        "Content-Type": "application/json", 
      },
    });
    return response.data; 
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// Mendapatkan detail scan dengan semua tes berdasarkan ID
export const getScanWithTests = async (scanId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/scan/${scanId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// Menghapus scan berdasarkan ID
export const deleteScanById = async (scanId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/scan/${scanId}`);
    return response.data; 
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// Mendapatkan detail test berdasarkan ID
export const getTestDetails = async (testId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/test/${testId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.message);
  }
};
