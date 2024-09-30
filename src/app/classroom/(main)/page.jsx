import { AppFetchApi } from "../shared/usecase/global-fetch-api";
import { serverResponseHandler } from "../shared/usecase/server-response-handler";
import { getServerSession } from "../shared/usecase/session/get-server-session";

export const metadata = {
  title: "Beranda | Sisva",
  description: "Sisva | Solusi Digitalisasi dan Modernisasi Sekolah",
};

/** JUST FOR EXAMPLE */
async function getUserById() {
  const session = await getServerSession();

  const res = await AppFetchApi(`/user/v1/users/${session?.id}`, {
    method: "GET",
    headers: {
      "X-Sisva-Source": "test",
    },
  });

  return serverResponseHandler(res, "error message", "success message");
}
export default async function Home() {
  const user = await getUserById();

  return (
    <ul>
      <li>{user.data?.name}</li>
      <li>{user.data?.type}</li>
      <li>{user.data?.username}</li>
    </ul>
  );
}
