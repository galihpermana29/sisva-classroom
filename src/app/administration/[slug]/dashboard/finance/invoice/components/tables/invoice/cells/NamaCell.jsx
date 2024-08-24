"use client";

import { TableCell, Typography } from "@mui/material";
import { useGetUserById } from "@/hooks/useGetUserById";
import { TableCellLoading } from "@/components/CustomTable";
import { useGetStudentById } from "../../../../hooks/useGetStudentById";

export const NamaCell = ({ userId }) => {
  const enabled = Boolean(userId);
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: userIsError,
  } = useGetUserById(userId, enabled);

  const {
    data: studentData,
    isLoading: isStudentLoading,
    isError: isStudentError,
  } = useGetStudentById(userId, enabled);

  const isError = userIsError || isStudentError;
  const isLoading = isUserLoading || isStudentLoading;

  if (isLoading | !enabled) return <TableCellLoading />;

  return (
    <TableCell>
      {isError ? (
        "-"
      ) : (
        <div className="flex flex-col">
          <Typography variant="body2">{userData.name}</Typography>
          {studentData ? (
            <Typography
              variant="caption"
              color="gray"
            >
              {studentData.student_group_name}
            </Typography>
          ) : null}
        </div>
      )}
    </TableCell>
  );
};
