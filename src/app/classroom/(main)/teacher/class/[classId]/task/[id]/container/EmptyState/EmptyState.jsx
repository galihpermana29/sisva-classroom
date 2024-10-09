import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";

const EmptyStateStudentScore = ({ student_name }) => {
  return (
    <div className="p-4 w-full">
      <h3 className="text-base font-sembold text-[#333333] mt-10">
        {student_name}
      </h3>
      <span className="mt-2 text-sm text-base60">Ditugaskan</span>
      <div className="h-[500px]  flex justify-center items-center">
        <div className="">
          <EmptyState
            title="Siswa Belum Melakukan Pengumpulan"
            description="Terdapat mata pelajaran terjadwal bersamaan. Periksa dan sesuaikan jadwal."
          />
        </div>
      </div>
    </div>
  );
};

export default EmptyStateStudentScore;
