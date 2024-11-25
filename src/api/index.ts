"use client";

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
