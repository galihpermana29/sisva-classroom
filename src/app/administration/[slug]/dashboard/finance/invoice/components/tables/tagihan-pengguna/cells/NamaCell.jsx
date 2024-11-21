"use client";

import { TableCellLoading } from "@/components/CustomTable";
import { useGetUserById } from "@/hooks/query/user/useGetUserById";
import { TableCell, Typography } from "@mui/material";

export const NamaCell = ({ userId }) => {
  const { data: userData, isLoading, isError } = useGetUserById(userId);

  if (isLoading) return <TableCellLoading />;

  return (
    <TableCell>
      {isError ? (
        "-"
      ) : (
        <div className="flex flex-col">
          <Typography variant="body2">{userData.name}</Typography>
          <Typography variant="caption" color="gray">
            {userTypeMap[userData.type]}
          </Typography>
        </div>
      )}
    </TableCell>
  );
};

const userTypeMap = {
  student: "Siswa",
  teacher: "Guru",
  staff: "Staff",
};
