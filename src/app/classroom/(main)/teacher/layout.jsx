import { Kumbh_Sans } from "next/font/google";

const kumbh = Kumbh_Sans({
  subsets: ["latin"],
  variable: "--font-kumbh",
});

export default function TeacherLayout({ children }) {
  return <div className={kumbh.variable}>{children}</div>;
}
