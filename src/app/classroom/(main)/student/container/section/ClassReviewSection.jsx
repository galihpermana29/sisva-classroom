import { Flex } from "antd";
import CardClass from "@/app/classroom/shared/presentation/Card/CardClass";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";
import ProfileImage from "@/assets/images/Profile.png";

const ClassReviewSection = () => {
  return (
    <SectionLayout title="Tinjauan Kelas">
      <div className="h-[228px] overflow-scroll">
        <Flex className="flex-col lg:flex-row" gap={12}>
          {[...new Array(10)].map((_, index) => (
            <CardClass
              image={ProfileImage.src}
              deadline={"16/01/2023 • 23:59"}
              lessonName={"Matematika"}
              studentClass={"XII MIPA 1"}
              taskName={"Tugas 1"}
              teacherName={"Agus Sunjaya"}
              key={index}
            />
          ))}
        </Flex>
      </div>
    </SectionLayout>
  );
};

export default ClassReviewSection;
