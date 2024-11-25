"use client";

import { TableCell, Typography } from "@mui/material";

import { TableCellLoading } from "@/components/CustomTable";
import { useGetUserById } from "@/hooks/query/user/useGetUserById";

export const NamaCell = ({ userId }) => {
  const enabled = Boolean(userId);
  const {
    data: userData,
    isLoading,
    isError,
  } = useGetUserById(userId, enabled);

  if (isLoading | !enabled) return <TableCellLoading />;

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
  staff: "Staf",
  teacher: "Guru",
};
