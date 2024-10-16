import { ConfigProvider } from "antd";
import SisvaNavbar from "../shared/presentation/Navbar/Navbar";

export default function MainLayout({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: { fontFamily: "var(--font-kumbh)" },
      }}
    >
      <SisvaNavbar />
      <div className="px-3 md:px-10 lg:px-20 pt-10 pb-32 md:pb-10 font-kumbh">
        {children}
      </div>
    </ConfigProvider>
  );
}
