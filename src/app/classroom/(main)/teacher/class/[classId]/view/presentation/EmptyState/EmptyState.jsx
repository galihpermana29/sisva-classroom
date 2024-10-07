import { Plus } from "@untitled-ui/icons-react";
import Image from "next/image";

import SisvaButton from "@/app/classroom/shared/presentation/Button/GlobalButton";
import EmptyStateImg from "@/assets/svgs/empty-state.svg";

const EmptyState = ({ className }) => {
  return (
    <div
      className={`flex flex-col items-center mx-auto mt-4 w-fit ${className}`}
    >
      <Image src={EmptyStateImg} alt="empty-state" className="size-28" />

      <p className="mt-2 font-normal">No content created yet</p>

      <SisvaButton className="mt-2" icon={<Plus className="size-5" />}>
        <span className="text-sm font-bold">Add Resources</span>
      </SisvaButton>
    </div>
  );
};

export default EmptyState;
