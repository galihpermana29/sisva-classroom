"use client";
import { Home05, User01, Users01, Menu01 } from "@untitled-ui/icons-react";
import Image from "next/image";
import React, { useState } from "react";
import BrandLogo from "@/assets/classroom/images/BrandLogo.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { icon: Home05, label: "Beranda", path: "/classroom" },
  { icon: Users01, label: "Kelas", path: "/classroom/class" },
  { icon: User01, label: "Profil", path: "/classroom/profile" },
];

const NavItem = ({ icon: Icon, label, path, isActive, onClick }) => (
  <Link
    href={path}
    className={`flex items-center mb-2 sm:mb-0 sm:flex-col gap-2 ${
      isActive ? "text-primary" : "text-[#5D5D5D]"
    }`}
    onClick={onClick}
  >
    <Icon fill={isActive ? "#f96756" : "#5D5D5D"} width={20} height={20} />
    <span className="text-sm font-semibold">{label}</span>
  </Link>
);

const SisvaNavbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white px-4 sm:px-5 py-3 sm:py-4 sticky top-0 border-b border-b-[#F5F5F5] shadow-md">
      <div className="flex justify-between items-center">
        <Image src={BrandLogo} alt="brand-logo" className="w-24 sm:w-auto" />
        <div className="hidden sm:flex items-center gap-7">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              {...item}
              isActive={pathname.startsWith(item.path)}
            />
          ))}
        </div>
        <Menu01
          width={24}
          height={24}
          fill="#5D5D5D"
          className="text-[#5D5D5D] sm:hidden"
          onClick={toggleMenu}
        />
      </div>
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-3 bg-white border-t border-[#F5F5F5]">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              {...item}
              isActive={pathname.startsWith(item.path)}
              onClick={() => setIsOpen(false)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SisvaNavbar;
