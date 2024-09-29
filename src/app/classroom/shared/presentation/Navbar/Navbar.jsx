"use client";
import { Home05, User01, Users01 } from "@untitled-ui/icons-react";
import Image from "next/image";
import React from "react";
import BrandLogo from "@/assets/classroom/images/BrandLogo.svg";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { getClientSession } from "../../usecase/session/get-client-session";
import { useNavbar } from "../../usecase/hooks/use-navbar";

const NavItem = ({ icon: Icon, label, path, isActive }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(path)}
      className={`cursor-pointer transition-all flex flex-col items-center gap-1 ${
        isActive ? "text-primary" : "text-[#5D5D5D]"
      }`}
    >
      <Icon fill={isActive ? "#f96756" : "#5D5D5D"} width={22} height={22} />
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
};

const SisvaNavbar = () => {
  const pathname = usePathname();
  const userData = getClientSession();
  const userType = userData?.type;

  const { navItems } = useNavbar(userType);

  return (
    <>
      <nav className="bg-white px-5 py-4 hidden sm:block sticky top-0 border-b border-b-[#F5F5F5] shadow-md z-[9999]">
        <div className="flex justify-between items-center">
          <Image src={BrandLogo} alt="brand-logo" />
          <div className="flex items-center gap-7">
            {navItems.map((item) => (
              <NavItem
                key={item.path}
                {...item}
                isActive={pathname.startsWith(item.path)}
              />
            ))}
          </div>
        </div>
      </nav>
      <nav
        className="sm:hidden fixed bottom-0 left-0 right-0 bg-white shadow-top rounded-l-[20px] rounded-r-[20px] z-[9999]"
        style={{
          borderTop: "1px solid #F5F5F5",
        }}
      >
        <div className="flex justify-around items-center py-6">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              {...item}
              isActive={pathname.startsWith(item.path)}
            />
          ))}
        </div>
      </nav>
    </>
  );
};

export default SisvaNavbar;
