import Image from "next/image";

import EmptyStateImg from "@/assets/svgs/empty-state.svg";
import { useParams } from "next/navigation";

const EmptyState = ({ className }) => {
  return (
    <div
      className={`flex flex-col items-center mx-auto mt-4 w-fit ${className}`}
    >
      <Image src={EmptyStateImg} alt="empty-state" className="size-28" />

      <p className="mt-2 font-normal">No content created yet</p>
    </div>
  );
};

export default EmptyState;
