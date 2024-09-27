import { Flex } from "antd";

const CardTaskSkeleton = () => {
  return (
    <div className="relative flex-none p-3 mr-3 overflow-hidden bg-gray-200 rounded-xl animate-pulse">
      <Flex vertical gap={4}>
        <div>
          <div className="w-20 h-4 mb-2 bg-gray-300 rounded"></div>
          <div className="w-12 h-2 mb-1 bg-gray-300 rounded"></div>
          <div className="w-16 h-3 bg-gray-300 rounded"></div>
        </div>
        <Flex justify="space-between" className="mt-2">
          <div className="h-2 bg-gray-300 rounded w-11"></div>
          <div className="w-1/4 h-2 bg-gray-300 rounded"></div>
        </Flex>
      </Flex>
    </div>
  );
};

export default CardTaskSkeleton;
