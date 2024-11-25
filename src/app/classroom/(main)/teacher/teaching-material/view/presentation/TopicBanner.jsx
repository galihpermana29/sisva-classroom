import React from "react";

import { useTokenColor } from "@/app/classroom/shared/usecase/use-token-color";

const TopicBanner = ({ title }) => {
  const { tokenColor } = useTokenColor();
  return (
    <div
      className="relative w-full px-4 py-3 rounded-lg"
      style={{ backgroundColor: `${tokenColor}30` }}
    >
      <div
        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[3px] h-5 rounded-r-full"
        style={{
          backgroundColor: tokenColor,
        }}
      />
      <div className="flex items-center gap-2">
        <span className="text-[#444444] font-medium">{title}</span>
      </div>
    </div>
  );
};

export default TopicBanner;
