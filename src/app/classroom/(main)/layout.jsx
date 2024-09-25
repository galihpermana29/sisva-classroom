import SisvaNavbar from "../shared/presentation/Navbar/Navbar";

export default function MainLayout({ children }) {
  return (
    <div>
      <SisvaNavbar />
      <div className="px-3 md:px-10 lg:px-20 py-7">{children}</div>
    </div>
  );
}
