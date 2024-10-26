"use client";

import { useGetStudentProfile } from "@/app/classroom/(main)/student/usecase/useGetStudentProfile";
import {
    BoxLeft,
    BoxRight,
    BoxTop,
} from "@/app/classroom/shared/presentation/Box/Box";
import AvatarProfile from "@/app/classroom/shared/presentation/Profile/AvatarProfile";
import PlaceholderProfile from "@/assets/placeholder.jpg";
import { Bell01 } from "@untitled-ui/icons-react/build/cjs";
import { Badge } from "antd";

const ProfileStudentSection = () => {
  const { student, isLoading } = useGetStudentProfile();
  return (
    <div className="-mx-3 -mt-7 lg:mx-0 lg:mt-0">
      <div
        className="w-full relative  px-6 py-16 lg:py-10 lg:rounded-xl rounded-b-3xl lg:h-fit h-[202px] "
        style={{
          background:
            "linear-gradient(103deg, #FA8D80 -31.55%, #F96756 53.14%)",
        }}
      >
        <BoxLeft />
        <BoxTop
          className="size-[103px] lg:size-[204px] left-1/2 -translate-x-1/3 -top-1/4 lg:-top-full"
          rotate={-67.677}
        />
        <BoxRight />
        <div className="flex justify-between">
          <div className="flex flex-col lg:flex-row gap-4">
            {isLoading ? (
              <div className="rounded-full bg-text_description/40 animate-pulse size-14" />
            ) : (
              <AvatarProfile
                src={student.student_image || PlaceholderProfile.src}
                size={56}
              />
            )}

            <div className="flex flex-col gap-1 text-white">
              {isLoading ? (
                <>
                  <div className="w-40 h-6 rounded-md bg-text_description/40 animate-pulse" />
                  <div className="w-20 h-4 bg-text_description/40 rounded-md animate-pulse" />
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold">
                    Halo, {student.student_name}! 👋
                  </h3>
                  <p className="lg:text-[15px] sm:text-xs">
                    Siswa. {student.student_group_name}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="size-10 rounded-full bg-white flex items-center justify-center">
            <Badge count={5} overflowCount={9} offset={[-3, 1]} size="small">
              <Bell01 className="text-[rgb(68,68,68)]" size={20} />
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStudentSection;
