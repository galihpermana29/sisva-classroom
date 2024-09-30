import { Flex } from "antd";

const CardScheduleSkeleton = ({ isEven }) => {
  return (
    <div>
      <div className="flex items-center gap-2 animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-10"></div>
        <div
          className={`w-full p-3 rounded-xl border  shadow-card mr-3 relative overflow-hidden ${
            isEven ? "bg-gray-200" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-1 h-10 absolute rounded-r-md left-0 top-1/2 -translate-y-1/2 ${
              isEven ? "bg-gray-400" : "bg-gray-500"
            }`}
          ></div>
          <div className="flex flex-col gap-[3px]">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardScheduleSkeleton;
