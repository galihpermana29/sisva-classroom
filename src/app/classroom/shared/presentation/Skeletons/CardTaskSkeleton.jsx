const CardTaskSkeleton = () => {
  return (
    <div className="flex-none relative bg-gray-200 p-3 rounded-xl mr-3 overflow-hidden animate-pulse">
      <div className="flex flex-col gap-1">
        <div>
          <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
          <div className="h-2 bg-gray-300 rounded w-12 mb-1"></div>
          <div className="h-3 bg-gray-300 rounded w-16"></div>
        </div>
        <div className="flex justify-between mt-2">
          <div className="h-2 bg-gray-300 rounded w-11"></div>
          <div className="h-2 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default CardTaskSkeleton;
