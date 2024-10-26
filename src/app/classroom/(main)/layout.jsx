import { ConfigProvider } from "antd";
import { Kumbh_Sans } from "next/font/google";
import SisvaNavbar from "../shared/presentation/Navbar/Navbar";

const kumbh = Kumbh_Sans({
  subsets: ["latin"],
});
export default function MainLayout({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: { fontFamily: kumbh.style.fontFamily, colorPrimary: "#F96756" },
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
