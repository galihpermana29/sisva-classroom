"use client";
import BrandLogo from "@/assets/classroom/images/BrandLogo.svg";
import { Skeleton } from "antd";
import { Kumbh_Sans } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useNavbar } from "../../usecase/hooks/use-navbar";
import { getClientSession } from "../../usecase/session/get-client-session";

const kumbh = Kumbh_Sans({
  subsets: ["latin"],
});

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
  const userData = getClientSession();
  const userType = userData?.type;

  const { navItems, navbarText, isFetching, navbarDescription } =
    useNavbar(userType);

  const renderNavbarText = navbarText();
  const renderNavbarDescription = navbarDescription();

  return (
    <>
      <nav
        className="bg-white px-5 py-4 hidden sm:block sticky top-0 border-b border-b-[#F5F5F5] shadow-md z-20"
        style={{
          fontFamily: kumbh.style.fontFamily,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={BrandLogo} alt="brand-logo" />
            {isFetching ? (
              <Skeleton.Button active size="large" shape="square" block />
            ) : (
              <div className="flex flex-col gap-2 text-[#444444]">
                {renderNavbarText && (
                  <span className="font-medium">{renderNavbarText}</span>
                )}
                {renderNavbarDescription && (
                  <span className="text-sm">{renderNavbarDescription}</span>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-7">
            {navItems.map((item) => (
              <NavItem key={item.path} {...item} isActive={item.isActive} />
            ))}
          </div>
        </div>
      </nav>
      <nav
        className="sm:hidden fixed bottom-0 left-0 right-0 bg-white shadow-top rounded-l-[20px] rounded-r-[20px] z-20"
        style={{
          borderTop: "1px solid #F5F5F5",
          fontFamily: kumbh.style.fontFamily,
        }}
      >
        <div className="flex items-center justify-around py-6">
          {navItems.map((item) => (
            <NavItem key={item.path} {...item} isActive={item.isActive} />
          ))}
        </div>
      </nav>
    </>
  );
};

export default SisvaNavbar;
