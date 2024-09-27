import { Flex } from "antd";
import { BoxTop } from "../Box/Box";

const Cardtask = ({ taskName, lessonName, teacherName, deadline }) => {
  return (
    <div className="flex-none relative bg-[#F96756] text-white p-3 rounded-xl mr-3 overflow-hidden">
      <BoxTop className="size-[104px] -right-5 -top-1/2" rotate={-67.677} />
      <Flex vertical gap={4}>
        <div>
          <h3 className="text-sm  font-semibold">{taskName}</h3>
          <p className="text-xs my-1">{lessonName}</p>
          <p className="text-xs">{teacherName}</p>
        </div>
        <Flex justify="space-between" className="mt-0.5" gap={2}>
          <p className="text-[10px]">Deadline</p>
          <p className="text-[10px]">{deadline}</p>
        </Flex>
      </Flex>
    </div>
  );
};

export default Cardtask;
