import { ChevronRight } from "@untitled-ui/icons-react";
import clsx from "clsx";
import React from "react";

import { useTokenColor } from "../../usecase/use-token-color";

const MenuItem = ({ icon, title, subtitle, active, onClick }) => {
  const { tokenColor } = useTokenColor();
  return (
    <div
      onClick={onClick}
      className={clsx(
        "text-[#181D27] flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all",
        !active && "hover:bg-[#f0f0f0] bg-white"
      )}
      style={{
        backgroundColor: active ? `${tokenColor}30` : "",
      }}
    >
      <div className="flex items-center">
        <div
          className={clsx(
            "rounded-full flex items-center justify-center w-10 h-10",
            active && "bg-white"
          )}
          style={{
            color: tokenColor,
            backgroundColor: active ? `${tokenColor}10` : "",
          }}
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
};

export default MenuItem;
