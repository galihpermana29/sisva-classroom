import { Flex } from "antd";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";
import CardSchedule from "@/app/classroom/shared/presentation/Card/CardSchedule";

const MySchedule = () => {
  return (
    <SectionLayout title={"Jadwal Hari Ini"} divider>
      <div className="h-[228px] overflow-scroll">
        <Flex vertical gap={12}>
          {[...new Array(10)].map((_, index) => (
            <CardSchedule
              scheduleName={"Upacara"}
              teacherName={"Maryam S.Pd"}
              time={"07.00"}
              key={index}
              isEven={index % 2 == 0}
            />
          ))}
        </Flex>
      </div>
    </SectionLayout>
  );
};

export default MySchedule;
