import EmptyStateGif from "@/assets/empty-state.gif";
import Image from "next/image";

const EmptyState = ({ title, description }) => {
  return (
    <div>
      <div className="flex flex-col items-center">
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
      </div>
    </div>
  );
};

export default EmptyState;
