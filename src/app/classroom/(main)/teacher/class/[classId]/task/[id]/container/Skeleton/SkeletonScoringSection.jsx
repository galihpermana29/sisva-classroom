import React from "react";

const SkeletonScoringSection = () => {
  return (
    <div className="p-4 w-full flex flex-col gap-4 font-kumbh">
      <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse mt-10"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse mb-4"></div>

      <div className="h-12 bg-gray-200 rounded mb-4 animate-pulse"></div>

      <div className="border-b border-gray-300 mb-4">
        <div className="h-4 bg-gray-200 w-1/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse my-2"></div>
      </div>

      <div className="mb-4">
        <div className="h-4 bg-gray-200 w-1/4 animate-pulse mb-2"></div>
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="mb-4">
        <div className="h-4 bg-gray-200 w-1/4 animate-pulse mb-2"></div>
        <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div>
        <div className="h-10 bg-gray-200 rounded w-1/4 animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonScoringSection;
