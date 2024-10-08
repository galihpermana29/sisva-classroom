import { DotsGrid } from "@untitled-ui/icons-react";
import React from "react";

const TopicBanner = ({ title }) => {
  return (
    <div className="relative w-full bg-[#FEECE9] px-4 py-3 rounded-lg">
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[2px] h-5 bg-primary rounded-r-full" />
      <div className="flex items-center gap-2">
        <span className="text-[#444444] font-medium">{title}</span>
      </div>
    </div>
  );
};

export default TopicBanner;
