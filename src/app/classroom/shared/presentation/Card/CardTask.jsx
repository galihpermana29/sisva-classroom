import { useTokenColor } from "../../usecase/use-token-color";
import { BoxTop } from "../Box/Box";

const Cardtask = ({ taskName, lessonName, teacherName, deadline }) => {
  const { tokenColor } = useTokenColor();
  return (
    <div
      className="min-w-40 flex-none relative text-white p-3 rounded-xl mr-3 overflow-hidden"
      style={{
        backgroundColor: tokenColor,
      }}
    >
      <BoxTop className="size-[104px] -right-5 -top-1/2" rotate={-67.677} />
      <div className="flex flex-col gap-1">
        <div>
          <h3 className="text-sm font-semibold">{taskName}</h3>
          <p className="my-1 text-xs">{lessonName}</p>
          <p className="text-xs">{teacherName}</p>
        </div>
        <div className="flex justify-between gap-0.5 mt-2">
          <p className="text-[10px]">Deadline</p>
          <p className="text-[10px]">{deadline}</p>
        </div>
      </div>
    </div>
  );
};

export default Cardtask;
