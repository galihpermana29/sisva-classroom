import NavbarDesktop from "../shared/presentation/Navbar/NavbarDesktop";

export default function MainLayout({ children }) {
  return (
    <div>
      <NavbarDesktop />
      <div className="px-3 md:px-10 lg:px-20 py-7">{children}</div>
    </div>
  );
}
