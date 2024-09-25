import { Flex } from "antd";
import SectionLayout from "../layouts/SectionLayout";
import CardSchedule from "../card/CardSchedule";

const MySchedule = () => {
  return (
    <SectionLayout title={"Jadwal Hari Ini"} divider>
      <div className="h-[228px] overflow-scroll">
        <Flex vertical gap={12}>
          {[...new Array(10)].map((_, index) => (
            <CardSchedule key={index} isEven={index % 2 == 0} />
          ))}
        </Flex>
      </div>
    </SectionLayout>
  );
};

export default MySchedule;
