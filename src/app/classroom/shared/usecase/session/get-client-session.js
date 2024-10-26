import { getCookie } from "cookies-next";

export function getClientSession() {
  const userDataCookie = getCookie("userData");

  if (userDataCookie) {
    try {
      return JSON.parse(userDataCookie);
    } catch (error) {
      console.error("Error parsing userData cookie:", error);
    }
  }

  return null;
}
