import Image from "next/image";
import React from "react";

import NoData from "@/assets/classroom/images/NoData.png";

const EmptyData = ({ title, subtitle }) => {
  return (
    <div className="flex justify-center items-center w-full py-20 lg:py-40 flex-col gap-2">
      <Image src={NoData} alt="empty-data" width={200} />
      <span className="text-center text-[#1D2939] text-lg font-bold">
        {title}
      </span>
      <span className="text-center text-[#98A2B3] text-sm">{subtitle}</span>
    </div>
  );
};

export default EmptyData;
