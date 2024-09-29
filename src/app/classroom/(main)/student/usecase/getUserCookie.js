import { cookies } from "next/headers";

export default function getUserCookie() {
  const cookieStore = cookies();
  const userDataCookie = cookieStore.get("userData")?.value;
  const userData = userDataCookie ? JSON.parse(userDataCookie) : null;
  return userData;
}
