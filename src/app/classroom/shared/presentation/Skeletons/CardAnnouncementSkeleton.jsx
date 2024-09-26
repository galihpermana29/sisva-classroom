import { Flex } from "antd";

const CardAnnouncementSkeleton = () => {
  return (
    <div className="flex-none w-full max-w-[312px] lg:max-w-none shadow-card p-4 rounded-xl animate-pulse">
      <Flex vertical gap={8}>
        <Flex gap={12}>
          <div className="w-[60px] h-[60px] bg-gray-300 rounded-md"></div>

          <Flex vertical gap={8}>
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
            <div className="max-sm:hidden w-48 h-3 bg-gray-300 rounded"></div>
          </Flex>
        </Flex>
        <div className="lg:hidden w-full h-3 bg-gray-300 rounded"></div>
      </Flex>
    </div>
  );
};

export default CardAnnouncementSkeleton;
