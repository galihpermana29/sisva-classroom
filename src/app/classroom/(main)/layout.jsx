import { ConfigProvider } from "antd";
import { Kumbh_Sans } from "next/font/google";

import SisvaNavbar from "../shared/presentation/Navbar/Navbar";
import { getSchoolById } from "../shared/repository/theme-service";
import { getServerSession } from "../shared/usecase/session/get-server-session";

const kumbh = Kumbh_Sans({
  subsets: ["latin"],
});
export default async function MainLayout({ children }) {
  const { school_id } = await getServerSession();
  const { data } = await getSchoolById(school_id);
  const theme = data.theme_json_text;

  return (
    <ConfigProvider
      theme={{
        token: { fontFamily: kumbh.style.fontFamily, colorPrimary: theme },
        components: {
          Button: {
            colorBorder: theme,
            colorText: theme,
            borderColorDisabled: "#D0D5DD",
          },
        },
      }}
    >
      <SisvaNavbar />
      <div
        className="px-3 md:px-10 lg:px-20 pt-10 pb-32 md:pb-10"
        style={{
          fontFamily: kumbh.style.fontFamily,
        }}
      >
        {children}
      </div>
    </ConfigProvider>
  );
}
