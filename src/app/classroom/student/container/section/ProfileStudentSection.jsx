"use client";

import { Avatar, Badge, Flex } from "antd";
import { LuBell } from "react-icons/lu";
import ProfileImage from "@/assets/images/Profile.png";
import { BoxLeft, BoxRight, BoxTop } from "../box/Box";
import useQueryStudentName from "../../usecase/useQueryStudentName";

const ProfileStudentSection = () => {
  const users = useQueryStudentName();
  console.log(users);
  return (
    <div className="-mx-3 lg:mx-0">
      <div
        className="w-full relative  px-6 py-16 lg:py-10 lg:rounded-xl rounded-b-3xl lg:h-fit h-[202px]"
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
        <Flex justify="space-between">
          <Flex gap={16} className="flex-col lg:flex-row">
            <Avatar src={ProfileImage.src} size={54} />
            <Flex vertical gap={4} className="text-white">
              <h3 className="text-xl font-bold">
                Halo, {users.student_name}! 👋
              </h3>
              <p className="lg:text-[15px] sm:text-xs">
                Siswi. {users.student_group_name}
              </p>
            </Flex>
          </Flex>
          <div className="size-10 rounded-full bg-white flex items-center justify-center">
            <Badge count={5} overflowCount={9} offset={[-3, 1]} size="small">
              <LuBell className="text-[rgb(68,68,68)]" size={20} />
            </Badge>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default ProfileStudentSection;
