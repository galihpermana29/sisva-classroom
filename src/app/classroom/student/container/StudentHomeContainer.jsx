import ProfileStudentSection from "./section/ProfileStudentSection";
import MenuKBMSection from "./section/MenuKBMSection";
import MyTaskSection from "./section/MyTaskSection";
import MyScheduleSection from "./section/MyScheduleSection";
import AnnouncementSection from "./section/AnnouncementSection";
import ClassReviewSection from "./section/ClassReviewSection";
import { Flex } from "antd";

const StudentHomeContainer = () => {
  return (
    <div className="pb-10">
      <ProfileStudentSection />
      <Flex vertical gap={24}>
        <MenuKBMSection />
        <Flex gap={20} className="flex-col lg:flex-row ">
          <MyTaskSection />
          <MyScheduleSection />
        </Flex>
        <AnnouncementSection />
        <ClassReviewSection />
      </Flex>
    </div>
  );
};

export default StudentHomeContainer;
