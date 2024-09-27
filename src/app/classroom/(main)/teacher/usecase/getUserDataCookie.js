'use server'

import { cookies } from "next/headers";

export function getUserDataCookie() {
  const cookieStore = cookies();
  const userDataCookie = cookieStore.get("userData")?.value;
  const userData = userDataCookie ? JSON.parse(userDataCookie) : null;
  return userData;
}
