import GradeSearchFilter from "./GradeSearchFilter";
import StudentSearchFilter from "./StudentSearchFilter";
import StudyProgramSearchFilter from "./StudyProgramSearchFilter";

export default function SearchFilter({ activeTab }: { activeTab: number }) {
  switch (activeTab) {
    case 0:
      return <StudyProgramSearchFilter />;
    case 1:
      return <GradeSearchFilter />;
    case 2:
      return <StudentSearchFilter />;
    default:
      return <></>;
  }
}
