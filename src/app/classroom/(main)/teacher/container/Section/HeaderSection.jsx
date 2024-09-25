import { Bell01 } from "@untitled-ui/icons-react";
import { Badge } from "antd";
import Image from "next/image";
import React from "react";

const HeaderSection = () => {
  return (
    <div className="flex justify-between px-4 py-6 pt-16 md:pt-6 bg-gradient-to-br from-primary_hover to-primary rounded-b-3xl md:rounded-xl">
      <div className="flex flex-col gap-4 md:items-center md:flex-row">
        <div className="relative overflow-hidden bg-white rounded-full size-14">
          <Image
            src="/images/teacher.jpg"
            alt="Alwi Sukra"
            width={56}
            height={56}
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">
            Halo, Alwi Sukra S.T.! 👋
          </h2>
          <p className="text-white text-[15px]">Guru Matematika</p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-white rounded-full size-12">
        <Badge count={5} overflowCount={9} offset={[-3, 1]} size="small">
          <Bell01 className="text-[rgb(68,68,68)]" size={20} />
        </Badge>
      </div>
    </div>
  );
};

export default HeaderSection;
