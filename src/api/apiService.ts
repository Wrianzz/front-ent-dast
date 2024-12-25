import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// Debug
//axios.interceptors.request.use(
//  (config) => {
//    console.log("Request sent:", {
//      url: config.url,
//      method: config.method,
//      headers: config.headers,
//      data: config.data,
//    });
//    return config;
//  },
//  (error) => {
//    console.error("Error during request:", error);
//    return Promise.reject(error);
//  }
//);

// Login user
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL.replace('/api', '')}/login`,
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const token = response.data.token;

    sessionStorage.setItem("authToken", token);
    //console.log("Token received and saved:", token); // Debugging log
    return token;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Register user baru
export const registerUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL.replace('/api', '')}/register`,
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.message; // Pesan sukses
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const logoutUser = () => {
  sessionStorage.removeItem("authToken");
};


// Helper untuk mendapatkan token autentikasi dari sessionStorage
export const getAuthToken = () => {
  const token = sessionStorage.getItem("authToken");
  //console.log("Retrieved token from sessionStorage:", token); // Debugging log
  return token;
};

// Contoh penggunaan token di header permintaan
const authHeader = () => {
  const token = getAuthToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

// Memulai scan baru
export const startScan = async (name: string, url: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/dast`,
      { name, url },
      {
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
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
        ...authHeader(),
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
        ...authHeader(),
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
        ...authHeader(),
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
    const response = await axios.delete(`${BASE_URL}/scan/${scanId}`, {
      headers: {
        ...authHeader(),
      },
    });
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
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.message);
  }
};
