const SkeletonDetailTaskSection = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-card">
      <div className="h-8 bg-gray-300 rounded w-1/5 animate-pulse"></div>

      <div className="mt-5 flex justify-between">
        <div className="h-6 bg-gray-300 rounded w-1/4 animate-pulse"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4 animate-pulse"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4 animate-pulse"></div>
      </div>

      <br />

      <div className="w-full">
        <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-full animate-pulse mt-2"></div>
      </div>

      <div
        className="w-full bg-[#F9F9F9] rounded-lg p-4 mt-5"
        style={{
          border: "solid 1px #d0d5dd",
        }}
      >
        <div className="h-8 bg-gray-300 rounded w-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonDetailTaskSection;
