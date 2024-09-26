import { AppFetchApi } from "../shared/usecase/global-fetch-api";
import { serverResponseHandler } from "../shared/usecase/server-response-handler";

export const metadata = {
  title: "Beranda | Sisva",
  description: "Sisva | Solusi Digitalisasi dan Modernisasi Sekolah",
};

/** JUST FOR EXAMPLE */
async function getUserById() {
  const res = await AppFetchApi(
    "/user/v1/users/0710e3fc-86d5-4ada-829e-38952c75a9ea",
    {
      method: "GET",
    }
  );

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
