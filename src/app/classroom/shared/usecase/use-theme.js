import { getSchoolById } from "../repository/theme-service";
import { getServerSession } from "./session/get-server-session";

export async function useTheme() {
  const { school_id } = await getServerSession();
  const { data } = await getSchoolById(school_id);
  return data.theme_json_text;
}
