import { Flex } from "antd";

const CardScheduleSkeleton = ({ isEven }) => {
  return (
    <div>
      <Flex align="center" gap={8} className="animate-pulse">
        <div className="w-10 h-4 bg-gray-300 rounded"></div>
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
          <Flex vertical gap={3}>
            <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
          </Flex>
        </div>
      </Flex>
    </div>
  );
};

export default CardScheduleSkeleton;
