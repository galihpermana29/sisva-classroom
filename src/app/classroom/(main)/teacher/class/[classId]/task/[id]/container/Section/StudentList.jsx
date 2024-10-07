import { SisvaSelect } from "@/app/classroom/shared/presentation/Input/SelectField";
import StudentCardScore from "../Card/StudentCardScore";
import { useSearchParams } from "next/navigation";
import SkeletonStudentCardScore from "../Skeleton/SkeletonStudentCardScore";
import { useGetStudentList } from "../../usecase/use-student-list";

export default function StudentList() {
  const { students, loading } = useGetStudentList();
  const params = useSearchParams();
  const student_id = params.get("student_id");

  return (
    <div
      className="flex flex-col w-full lg:max-w-xs"
      style={{
        borderRight: "solid 1px #D0D5DD",
      }}
    >
      <div
        className="p-6"
        style={{
          borderBottom: "solid 1px #D0D5DD",
        }}
      >
        <h2 className="text-base font-semibold text-base90">Daftar Siswa</h2>
      </div>

      <div
        className="p-4"
        style={{
          borderBottom: "solid 1px #D0D5DD",
        }}
      >
        <SisvaSelect
          customSize="sm"
          placeholder="Ditugaskan"
          customClassName="font-kumbh"
        />
      </div>

      <div className="flex flex-col max-h-[200px] lg:max-h-[500px] overflow-y-auto">
        {loading
          ? [...new Array(5)].map((_, index) => (
              <SkeletonStudentCardScore key={index} />
            ))
          : students?.map((student, i) => (
              <StudentCardScore
                name={student.student_name}
                image={student.student_image}
                score={student.student_score}
                selected={student.student_id == student_id}
                id={student.student_id}
                key={i}
              />
            ))}
      </div>
    </div>
  );
}
