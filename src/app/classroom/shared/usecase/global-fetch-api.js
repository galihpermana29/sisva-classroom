import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * @typedef {Object} SisvaFetchOptions
 * @property {'GET'|'POST'|'PUT'|'DELETE'|'PATCH'} [method] - HTTP method
 * @property {Object} [body] - Request body
 * @property {Object} [headers] - Additional headers
 * @property {RequestCache} [cache] - Cache mode
 * @property {Object} [next] - Next.js specific options
 */

/**
 * Fetches data from the Sisva API
 * @param {string} url - The API endpoint
 * @param {SisvaFetchOptions} [options={}] - Fetch options
 * @returns {Promise<Response>}
 */
export async function AppFetchApi(url, options = {}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("token")?.value;
  const userDataCookie = cookieStore.get("userData")?.value;

  const userData = userDataCookie ? JSON.parse(userDataCookie) : null;

  if (!accessToken || !userData) {
    redirect("/classroom/signin");
  }

  const defaultHeaders = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    "X-Sisva-Source": process.env.PROVIDED_SOURCE_HEADER || "",
    "X-Sisva-UserID": userData.id,
    "X-Sisva-SchoolID": userData.school_id,
  };

  try {
    const res = await fetch(`${process.env.API_SERVICE_BASE_URL}${url}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    return res;
  } catch (error) {
    throw error;
  }
}
