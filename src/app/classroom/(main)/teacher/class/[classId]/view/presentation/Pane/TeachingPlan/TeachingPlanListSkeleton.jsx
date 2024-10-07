import React from "react";

const TeachingPlanListSkeleton = () => {
  return (
    <div className="grid gap-3 animate-pulse">
      <div
        className={`relative flex items-center w-full h-10 px-2 rounded-md bg-gray-200`}
      >
        <div className="absolute top-0 bottom-0 left-0 w-[3px] my-auto bg-gray-400 h-[60%] rounded-full" />
      </div>
      {Array.from({ length: 2 }).map((_, idx) => (
        <div
          key={"skeleton" + idx}
          className={`relative flex items-center w-[98.5%] md:w-[99.5%] h-7 px-2 rounded-md bg-gray-200 ml-auto`}
        ></div>
      ))}
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={"skeleton" + idx}
          className={`relative grid w-[98.5%] md:w-[99.5% h-14 p-2 mb-1 gap-1 rounded-md bg-gray-200 ml-auto`}
        >
          <div className="w-full h-4 bg-gray-300 rounded-sm" />
          <div className="h-3 bg-gray-300 rounded-sm w-[95%] md:w-[99%] ml-auto" />

        </div>
      ))}
    </div>
  );
};

export default TeachingPlanListSkeleton;
