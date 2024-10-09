const SkeletonStudentCardScore = () => {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderBottom: "solid 1px #D0D5DD",
      }}
    >
      <div className="w-full inline-flex p-4 items-center justify-between">
        <div className="flex items-center">
          <div className="rounded-full bg-gray-300 h-8 w-8 animate-pulse"></div>
          <div className="ml-2">
            <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
          </div>
        </div>
        <div>
          <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonStudentCardScore;
