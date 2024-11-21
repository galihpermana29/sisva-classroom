"use client";

import axios from "axios";

export const getBearerToken = () => {
  if (typeof window !== "undefined" && window.localStorage.getItem("user")) {
    return JSON.parse(window.localStorage.getItem("user")).token;
  }
};

export const getUserId = () => {
  if (typeof window !== "undefined" && window.localStorage.getItem("user")) {
    return JSON.parse(window.localStorage.getItem("user")).user_id;
  }
};

export const getSchoolId = () => {
  if (typeof window !== "undefined" && window.localStorage.getItem("user")) {
    return JSON.parse(window.localStorage.getItem("user")).school_id;
  }
};

const api = axios.create({
  baseURL: "https://api-staging.sisva.id/tenant/v1/",
});

api.interceptors.request.use((config) => {
  return {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    ...config,
  };
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.replace("/auth/login");
      localStorage.clear();
      sessionStorage.clear();
      return;
    }

    // eslint-disable-next-line no-alert
    return Promise.reject(error);
  }
);

export default api;
