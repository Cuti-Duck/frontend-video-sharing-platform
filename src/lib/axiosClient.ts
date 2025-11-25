import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    // "Content-Type": "application/json",
  },
});

// ===== REQUEST INTERCEPTOR =====
axiosClient.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ===== RESPONSE INTERCEPTOR =====
axiosClient.interceptors.response.use(
  (response) => response, // Trả ra trực tiếp data
  (error) => {
    // Xử lý lỗi chung
    console.error("API Error:", error);

    if (error.response?.status === 401) {
      // Token hết hạn → xóa token, để AuthContext tự xử lý
      localStorage.removeItem("accessToken");
    }

    return Promise.reject(error);
  }
);

export default axiosClient;