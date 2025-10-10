import axios from "axios";
import useAuthStore from "../store/authStore";
import { BASE_URL, AUTH_LOGIN, AUTH_REGISTER } from "./urls";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const loginUser = async (email, password) => {
  try {
    const response = await api.post(
      `${AUTH_LOGIN}?email=${email}&password=${password}`
    );
    return response.data;
  } catch (err) {
    throw err.response?.data || { detail: "Login failed" };
  }
};

export const registerUser = async (email, password, fullName) => {
  try {
    const response = await api.post(AUTH_REGISTER, {
      email,
      password,
      full_name: fullName,
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || { detail: "Registration failed" };
  }
};

export default api;