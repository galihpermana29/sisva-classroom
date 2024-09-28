import { getCookie } from "cookies-next";

export function getUserDataCookie() {
  const userData = getCookie("userData");
  return userData ? JSON.parse(userData) : {};
}
