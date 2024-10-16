import React from "react";

const TitleBarSkeleton = () => {
  return (
    <div
      className={`relative flex items-center w-full h-10 px-2 rounded-md bg-gray-200 animate-pulse`}
    >
      <div className="absolute top-0 bottom-0 left-0 w-[3px] my-auto bg-gray-400 h-[60%] rounded-full" />
    </div>
  );
};

export default TitleBarSkeleton;
