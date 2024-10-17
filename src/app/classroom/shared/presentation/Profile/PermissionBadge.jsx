import React from "react";

const PermissionBadge = ({ permission }) => {
  manage_school;
  manage_staff;
  manage_academic;
  manage_student;
  manage_information;
  manage_finance;
  const getBadgeText = () => {
    switch (permission) {
      case "manage_school":
        return "Sekolah";
      case "manage_staff":
        return "Karyawan";
      case "manage_academic":
        return "Akademik";
      case "manage_student":
        return "Siswa";
      case "manage_information":
        return "Informasi";
      case "manage_finance":
        return "Keuangan";
      default:
        return "Invalid Permission";
    }
  };
  return (
    <div className="px-3 py-1 rounded-full bg-primary text-white font-semibold text-sm">
      {permission}
    </div>
  );
};

export default PermissionBadge;
