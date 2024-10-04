import { DotsVertical } from "@untitled-ui/icons-react";
import React from "react";

const TeachingPlanSection = ({ title, content }) => {
  return (
    <div>
      <div className="flex items-center gap-1 font-kumbh">
        <div className="flex items-center">
          <DotsVertical color="#5E5E5E" className="size-5 " />
          <DotsVertical color="#5E5E5E" className="-ml-[14px] size-5" />
        </div>

        <div className="font-bold text-xs">{title}</div>
      </div>

      {content && (
        <div className="pl-8 pb-2 text-sm font-normal">{content}</div>
      )}
    </div>
  );
};

export default TeachingPlanSection;
