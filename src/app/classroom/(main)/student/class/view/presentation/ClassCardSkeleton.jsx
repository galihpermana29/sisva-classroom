import { BoxTop } from "@/app/classroom/shared/presentation/Box/Box";
import { Divider } from "antd";

const ClassCardSkeleton = () => {
  return (
    <div className="relative flex-none w-full p-3 overflow-hidden bg-gray-200 rounded-xl animate-pulse">
      <BoxTop className="size-[104px] -right-5 -top-12" rotate={-67.677} />
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>

        <div className="flex flex-col gap-2.5">
          <div className="w-40 h-4 bg-gray-300 rounded-full"></div>
          <div className="w-32 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>

      <Divider
        variant="dashed"
        className="border border-secondary20 border-spacing-1"
        type="horizontal"
      />

      <div className="w-24 h-3 mb-2 bg-gray-300 rounded"></div>

      <div className="w-[280px] lg:w-[265px] p-3 rounded-xl border shadow-card bg-white relative animate-pulse">
        <div className="absolute left-0 w-1 h-10 -translate-y-1/2 bg-gray-400 rounded-r-md top-1/2"></div>
        <div className="flex flex-col gap-1">
          <div className="w-40 h-4 bg-gray-300 rounded"></div>
          <div className="w-20 h-3 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ClassCardSkeleton;
