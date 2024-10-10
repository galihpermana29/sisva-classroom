import StudentCardScore from "../Card/StudentCardScore";
import { useSearchParams } from "next/navigation";
import SkeletonStudentCardScore from "../Skeleton/SkeletonStudentCardScore";
import { useGetStudentList } from "../../usecase/use-student-list";
import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";
import { SisvaInputSearch } from "@/app/classroom/shared/presentation/Input/SisvaInputField";
import { useState } from "react";

export default function StudentList() {
  const [searchQuery, setSearchQuery] = useState("");
  const { students, loading } = useGetStudentList();
  const params = useSearchParams();
  const student_id = params.get("student_id");

  const filteredStudents = students?.filter((student) =>
    student.student_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <SisvaInputSearch
          placeholder={"Cari Siswa"}
          loading={loading}
          onChange={(e) => setSearchQuery(e.target.value)}
          customClassName="w-full"
        />
      </div>

      <div className="flex flex-col max-h-[200px] lg:max-h-[500px] overflow-y-auto">
        {loading ? (
          [...new Array(5)].map((_, index) => (
            <SkeletonStudentCardScore key={index} />
          ))
        ) : filteredStudents.length > 0 ? (
          filteredStudents.map((student, i) => (
            <StudentCardScore
              name={student.student_name}
              image={student.student_image}
              score={student.student_score}
              selected={student.student_id == student_id}
              id={student.student_id}
              key={i}
            />
          ))
        ) : searchQuery.length <= 0 ? (
          <div className="px-3">
            <EmptyState
              title={"Belum ada siswa yang bergabung"}
              description={"Kelas ini belum memiliki siswa yang terdaftar."}
            />
          </div>
        ) : (
          <div className="px-3">
            <EmptyState
              title={"Siswa tidak ditemukan"}
              description={"Siswa dengan nama yang anda cari tidak ditemukan."}
            />
          </div>
        )}
      </div>
    </div>
  );
}
