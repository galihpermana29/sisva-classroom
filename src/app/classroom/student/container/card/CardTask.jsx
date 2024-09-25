import { Flex } from "antd";
import { BoxTop } from "../box/Box";

const Cardtask = () => {
  return (
    <div className="flex-none relative bg-[#F96756] text-white p-3 rounded-xl mr-3 overflow-hidden">
      <BoxTop className="size-[104px] -right-5 -top-1/2" rotate={-67.677} />
      <Flex vertical gap={4}>
        <div>
          <h3 className="text-sm  font-semibold">Tugas 1</h3>
          <p className="text-xs my-1">TIK</p>
          <p className="text-xs">Bimo.S.Pd</p>
        </div>
        <Flex justify="space-between" className="mt-0.5">
          <p className="text-[10px]">Deadline</p>
          <p className="text-[10px]">16/01/2023 23:59</p>
        </Flex>
      </Flex>
    </div>
  );
};

export default Cardtask;
