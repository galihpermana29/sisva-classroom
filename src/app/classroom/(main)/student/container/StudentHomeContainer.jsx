import AnnouncementSection from "./Section/AnnouncementSection";
import ClassReviewSection from "./Section/ClassReviewSection";
import MenuKBMSection from "./Section/MenuKBMSection";
import ProfileStudentSection from "./Section/ProfileStudentSection";
import StudentScheduleSection from "./Section/StudentScheduleSection";
import StudentTaskSection from "./Section/StudentTaskSection";

const StudentHomeContainer = () => {
  return (
    <div className="max-w-6xl mx-auto pb-10">
      <ProfileStudentSection />
      <div className="flex flex-col gap-6">
        <MenuKBMSection />
        <div className=" flex flex-col lg:flex-row gap-5">
          <StudentTaskSection />
          <StudentScheduleSection />
        </div>
        <AnnouncementSection />
        <ClassReviewSection />
      </div>
    </div>
  );
};

export default StudentHomeContainer;
