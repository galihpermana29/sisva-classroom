"use client";
import { LogOut04 } from "@untitled-ui/icons-react";
import dynamic from "next/dynamic";
import { useState } from "react";

import CardProfile from "@/app/classroom/shared/presentation/Card/CardProfile";
import FormFields from "@/app/classroom/shared/presentation/Profile/FormFields";
import MenuItem from "@/app/classroom/shared/presentation/Profile/MenuItem";

import { useProfile } from "../../usecase/hooks/profile/use-profile";
import { useSignOut } from "../../usecase/hooks/profile/use-signout";
import { useTokenColor } from "../../usecase/use-token-color";

const DeleteConfirmation = dynamic(() =>
  import("@/app/classroom/shared/presentation/Modal/DeleteConfirmation")
);

const ProfileContainer = ({ initialData, profileMenus }) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const { tokenColor } = useTokenColor();
  const {
    handleClickTab,
    step,
    isEdit,
    setIsEdit,
    data,
    imageLoading,
    handleChangeProfilePicture,
    loading,
    form,
    handleSubmitSection,
    handleCancelEdit,
  } = useProfile(initialData);

  const { signOut } = useSignOut(setLogoutModal);

  return (
    <div className="max-w-6xl mx-auto font-kumbh -mt-10 md:mt-auto">
      <div className="flex flex-col md:flex-row md:gap-12">
        <div className="flex flex-col w-full md:w-[300px] lg:w-[350px] md:flex-shrink-0 md:h-[calc(100vh-150px)] md:overflow-y-auto md:overflow-x-hidden no-scrollbar">
          <CardProfile
            name={data?.name}
            username={data?.username}
            subject={data?.type}
            identityNumber={data?.nik}
            profilePic={
              data?.profile_image_uri !== "" ? data?.profile_image_uri : ""
            }
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
            <div
              className="w-full h-[0.5px] my-2 rounded-full"
              style={{
                backgroundColor: tokenColor,
              }}
            />
            <MenuItem
              icon={<LogOut04 width={20} height={20} />}
              title="Log Out"
              subtitle="Keluar dari akun"
              onClick={() => setLogoutModal(true)}
            />
          </div>
        </div>
        <div className="w-full mt-6 md:mt-0 md:h-[calc(100vh-150px)] md:overflow-y-auto no-scrollbar">
          <FormFields
            loading={loading}
            imageLoading={imageLoading}
            formData={data}
            form={form}
            step={step}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            handleFileUpload={handleChangeProfilePicture}
            handleSubmitSection={handleSubmitSection}
            handleCancelEdit={handleCancelEdit}
          />
        </div>
      </div>
      <DeleteConfirmation
        open={logoutModal}
        handleClose={() => setLogoutModal(false)}
        handleOk={signOut}
        title="Are you sure want to logout?"
      />
    </div>
  );
};

export default ProfileContainer;
