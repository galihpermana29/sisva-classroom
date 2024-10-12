"use client";
import React from "react";
import CardProfile from "@/app/classroom/shared/presentation/Card/CardProfile";
import MenuItem from "@/app/classroom/shared/presentation/Profile/MenuItem";
import { useTeacherProfile } from "../../usecase/use-teacher-profile";
import { Lock01, LogOut04, User01, UserSquare } from "@untitled-ui/icons-react";
import FormItem from "@/app/classroom/shared/presentation/Profile/FormItem";

const TeacherProfileContainer = ({ initialData }) => {
  const { handleClickTab, step, isEdit, setIsEdit } = useTeacherProfile();

  const profileMenus = [
    {
      icon: <User01 width={20} height={20} />,
      title: "Biodata",
      subtitle: "Informasi biodata akunmu",
      key: "biodata",
    },
    {
      icon: <UserSquare width={20} height={20} />,
      title: "Akun",
      subtitle: "Buat perubahan akunmu",
      key: "akun",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mb-[8dvh] md:mb-0 font-kumbh -mt-10 md:mt-auto">
      <div className="flex flex-col md:flex-row md:gap-12">
        <div className="flex flex-col w-full md:w-[300px] lg:w-[350px] md:flex-shrink-0">
          <CardProfile
            name={initialData.name}
            username={initialData.username}
            subject={initialData.type}
            identityNumber="100010010"
          />
          <div className="mt-6 bg-white rounded-xl shadow flex flex-col gap-2 p-3">
            {profileMenus.map((item, idx) => (
              <MenuItem
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                onClick={() => handleClickTab(item.key)}
                active={step === item.key}
                key={idx}
              />
            ))}
            <div className="w-full h-[0.5px] bg-primary my-2 rounded-full" />
            <MenuItem
              icon={<LogOut04 width={20} height={20} />}
              title="Log Out"
              subtitle="Keluar dari akun"
              onClick={null}
            />
          </div>
        </div>
        <div className="w-full mt-6 md:mt-0 md:h-[calc(100vh-100px)] md:overflow-y-auto no-scrollbar">
          <FormItem step={step} isEdit={isEdit} setIsEdit={setIsEdit} />
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileContainer;
