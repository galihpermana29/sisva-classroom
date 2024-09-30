import AnnouncementSection from "./Section/AnnouncementSection";
import HeaderSection from "./Section/HeaderSection";
import MenuKBMSection from "./Section/MenuKBMSection";
import ScheduleSection from "./Section/ScheduleSection";
import TaskSection from "./Section/TaskSection";

const TeacherHomeContainer = () => {
  return (
    <div className="max-w-6xl mx-auto font-kumbh">
      <HeaderSection />
      <MenuKBMSection />
      <div className="flex flex-col w-full gap-6 mt-8 mb-6 md:flex-row">
        <TaskSection />
        <ScheduleSection />
      </div>
      <AnnouncementSection />
    </div>
  );
};

export default TeacherHomeContainer;
