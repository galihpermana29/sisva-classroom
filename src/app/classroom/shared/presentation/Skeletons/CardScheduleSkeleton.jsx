import { Flex } from "antd";

const CardScheduleSkeleton = ({ isEven }) => {
  return (
    <div>
      <Flex align="center" gap={8} className="animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-10"></div>
        <div
          className={`w-full p-3 rounded-xl border border-secondary50 shadow-card mr-3 relative overflow-hidden ${
            isEven ? "bg-gray-200" : "bg-gray-300"
          }`}
          style={{
            border: "1px solid var(--Secondary-50, #F96756)",
          }}
        >
          <div
            className={`w-1 h-10 absolute rounded-r-md left-0 top-1/2 -translate-y-1/2 ${
              isEven ? "bg-secondary50" : "bg-secondary70"
            }`}
          ></div>
          <Flex vertical gap={2}>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </Flex>
        </div>
      </Flex>
    </div>
  );
};

export default CardScheduleSkeleton;
