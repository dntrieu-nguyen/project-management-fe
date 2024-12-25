import { getItems, removeAuth, setItems } from "@/utils/utils";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

let lang = "en";

// Tạo một instance của axios
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// Thiết lập header Accept-Language
instance.defaults.headers.common["Accept-Language"] = lang;

// Interceptor cho request
instance.interceptors.request.use(
  async (config) => {
    const accessToken = getItems("accessToken");

    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor cho response
instance.interceptors.response.use(
  (response: AxiosResponse) => response?.data,
  async (error) => {
    const originalConfig = error.config;

    if (error?.response?.status === 401) {
      const refreshToken = Cookies.get("refreshToken");

      if (refreshToken && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}auth/refresh_token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshToken}`,
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
          });

          const data = await response.json();

          if (data?.data?.new_access_token) {
            setItems("accessToken", data?.data?.new_access_token);
            originalConfig.headers["Authorization"] = `Bearer ${data?.data?.new_access_token}`;
            return instance(originalConfig);
          } else {
            handleRedirectToLogin();
          }
        } catch (_error) {
          handleRedirectToLogin();
          return Promise.reject(_error);
        }
      }
    }

    // if (error?.response) {
    //   return error?.response?.data;
    // }

    return Promise.reject(error?.response?.data);
  },
);

const handleRedirectToLogin = () => {
  removeAuth();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

export default instance;
