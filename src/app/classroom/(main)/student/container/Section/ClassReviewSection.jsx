import { Flex } from "antd";
import { Suspense } from "react";
import CardClass from "@/app/classroom/shared/presentation/Card/CardClass";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";
import { useGetClassReviews } from "@/app/classroom/(main)/student/usecase/useGetClassReview";
import CardClassSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardClassSkeleton";
import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";
import { convertDateTime12To24 } from "@/app/classroom/(main)/student/usecase/convertDateTime12To24";

const ClassReviewSection = async () => {
  const classReviews = await useGetClassReviews();

  return (
    <SectionLayout title="Tinjauan Kelas">
      <div className="h-[228px] overflow-auto">
        <Flex className="flex-col lg:flex-row" gap={12}>
          <Suspense
            fallback={[...new Array(3)].map((_, index) => (
              <CardClassSkeleton key={index} />
            ))}
          >
            {classReviews.length > 0 ? (
              classReviews.map((classReview, index) => (
                <CardClass
                  key={index}
                  lessonName={classReview.subject_name}
                  studentClass={classReview.class_name}
                  teacherName={classReview.teacher_name}
                  taskName={classReview.name}
                  deadline={convertDateTime12To24(classReview.deadline)}
                  image={classReview.profile_uri}
                />
              ))
            ) : (
              <div className="mx-auto">
                <EmptyState
                  title="Tidak ada Tinjauan Kelas Tersedia!"
                  description="Tidak ada tinjauan kelas yang tersedia untuk saat ini."
                />
              </div>
            )}
          </Suspense>
        </Flex>
      </div>
    </SectionLayout>
  );
};

export default ClassReviewSection;
