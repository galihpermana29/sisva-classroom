import { Flex } from "antd";
import Image from "next/image";

const CardAnnouncement = ({ image, announcementName, description }) => {
  return (
    <div className=" flex-none w-full max-w-[312px] lg:max-w-none shadow-card  p-4 rounded-xl">
      <Flex vertical gap={8}>
        <Flex gap={12}>
          <Image
            src={image}
            alt={announcementName}
            className="size-14 rounded-md object-cover overflow-clip "
          />
          <Flex vertical gap={8}>
            <h3 className="pr-3 lg:pr-0 text-sm font-semibold text-base90">
              {announcementName}
            </h3>
            <p className="max-sm:hidden text-xs text-text_description line-clamp-1 ">
              {description}
            </p>
          </Flex>
        </Flex>
        <p className="lg:hidden text-xs text-text_description line-clamp-2 ">
          {description}
        </p>
      </Flex>
    </div>
  );
};

export default CardAnnouncement;
