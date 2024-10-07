import { DotsVertical } from "@untitled-ui/icons-react";
import React from "react";

const TeachingPlanTitle = ({ title, className, prefix }) => {
  return (
    <div
      className={`relative flex items-center w-full h-10 px-2 rounded-md bg-secondary10 ${className}`}
    >
      <div className="absolute top-0 bottom-0 left-0 w-[3px] my-auto bg-secondary50 h-[60%] rounded-full" />

      <DotsVertical color="#5E5E5E" className="size-5 " />
      <DotsVertical color="#5E5E5E" className="-ml-[14px] size-5" />

      <h2 className="ml-1 text-sm font-medium font-kumbh">{title}</h2>

      <div className="ml-auto">{prefix}</div>
    </div>
  );
};

export default TeachingPlanTitle;
