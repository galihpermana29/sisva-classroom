import ProfileStudentSection from "./Section/ProfileStudentSection";
import MenuKBMSection from "./Section/MenuKBMSection";
import StudentTaskSection from "./Section/StudentTaskSection";
import StudentScheduleSection from "./Section/StudentScheduleSection";
import AnnouncementSection from "./Section/AnnouncementSection";
import ClassReviewSection from "./Section/ClassReviewSection";
import { Flex } from "antd";

const StudentHomeContainer = () => {
  return (
    <div className="pb-10">
      <ProfileStudentSection />
      <Flex vertical gap={24}>
        <MenuKBMSection />
        <Flex gap={20} className="flex-col lg:flex-row ">
          <StudentTaskSection />
          <StudentScheduleSection />
        </Flex>
        <AnnouncementSection />
        <ClassReviewSection />
      </Flex>
    </div>
  );
};

export default StudentHomeContainer;
