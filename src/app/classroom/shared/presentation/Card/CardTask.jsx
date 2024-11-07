import Link from "next/link";
import { BoxTop } from "../Box/Box";

const Cardtask = ({
  taskName,
  lessonName,
  teacherName,
  deadline,
  classId,
  taskId,
}) => {
  return (
    <Link href={`/classroom/student/class/${classId}/task/${taskId}`}>
      <div className="flex-none relative bg-[#F96756] text-white p-3 rounded-xl mr-3 overflow-hidden">
        <BoxTop className="size-[104px] -right-5 -top-1/2" rotate={-67.677} />
        <div className="flex flex-col gap-1">
          <div>
            <h3 className="text-sm  font-semibold">{taskName}</h3>
            <p className="text-xs my-1">{lessonName}</p>
            <p className="text-xs">{teacherName}</p>
          </div>
          <div className="flex justify-between gap-0.5 mt-0.5">
            <p className="text-[10px]">Deadline</p>
            <p className="text-[10px]">{deadline}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Cardtask;
