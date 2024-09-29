import { cookies } from "next/headers";

export function getServerSession() {
  const cookieStore = cookies();
  const userDataCookie = cookieStore.get("userData");

  if (userDataCookie) {
    try {
      return JSON.parse(userDataCookie.value);
    } catch (error) {
      console.error("Error parsing userData cookie:", error);
    }
  }

  return null;
}
