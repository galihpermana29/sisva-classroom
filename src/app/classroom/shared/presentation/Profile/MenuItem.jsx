import { ChevronRight } from "@untitled-ui/icons-react";
import clsx from "clsx";
import React from "react";

const MenuItem = ({ icon, title, subtitle, active, onClick }) => (
  <div
    onClick={onClick}
    className={clsx(
      "text-[#181D27] flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all",
      !active && "hover:bg-[#FEECE9] bg-white",
      active && "bg-[#FEECE9]"
    )}
  >
    <div className="flex items-center">
      <div
        className={clsx(
          "rounded-full flex items-center justify-center w-10 h-10 bg-[#FFF5F4] text-primary",
          active && "bg-white"
        )}
      >
        {icon}
      </div>
      <div className="ml-4">
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
    <ChevronRight
      width={20}
      height={20}
      className="text-[#98A2B3] font-semibold"
    />
  </div>
);

export default MenuItem;
