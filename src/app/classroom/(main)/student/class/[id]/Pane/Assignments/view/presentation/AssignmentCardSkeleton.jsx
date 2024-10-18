import React from "react";

const AssignmentCardSkeleton = () => {
  return (
    <div
      className={`relative flex flex-col w-full h-56 p-4 rounded-lg bg-gray-200 ml-auto animate-pulse`}
    >
      <div className="w-1/2 h-8 bg-gray-300 rounded-md" />

      <div className="w-1/5 h-4 mt-4 bg-gray-300 rounded-md" />
      <div className="w-1/4 h-5 mt-2 bg-gray-300 rounded-md" />

      <div className="w-1/5 h-4 mt-4 bg-gray-300 rounded-md" />
      <div className="w-1/4 h-5 mt-2 bg-gray-300 rounded-md" />
    </div>
  );
};

export default AssignmentCardSkeleton;
