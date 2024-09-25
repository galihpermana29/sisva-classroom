import { Flex } from "antd";
import CardTask from "../card/CardTask";
import SectionLayout from "../layouts/SectionLayout";

const MyTask = () => {
  return (
    <SectionLayout title={"Tugas yang Akan Datang"}>
      <div className="lg:h-[228px] overflow-scroll">
        <Flex gap={12} className="flex-row lg:flex-col ">
          {[...new Array(10)].map((_, index) => (
            <CardTask key={index} />
          ))}
        </Flex>
      </div>
    </SectionLayout>
  );
};

export default MyTask;
