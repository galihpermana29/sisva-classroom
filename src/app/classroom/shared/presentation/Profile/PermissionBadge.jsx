import React from "react";

const PermissionBadge = ({ permission }) => {
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
      {getBadgeText()}
    </div>
  );
};

export default PermissionBadge;
