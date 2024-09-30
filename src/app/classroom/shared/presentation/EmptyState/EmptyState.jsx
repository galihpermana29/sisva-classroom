import Image from "next/image";
import EmptyStateGif from "@/assets/empty-state.gif";
import { Flex } from "antd";

const EmptyState = ({ title, description }) => {
  return (
    <div>
      <Flex vertical align="center">
        <Image
          src={EmptyStateGif}
          alt="empty-state"
          className="size-32 lg:size-40"
        />
        <h1 className="text-sm font-semibold lg:text-base text-primary100">
          {title}
        </h1>
        <p className="text-xs lg:text-sm text-base50 mt-0.5 lg:mt-2">
          {description}
        </p>
      </Flex>
    </div>
  );
};

export default EmptyState;
