import { Checkbox, TableCell, TableRow, Typography } from "@mui/material";

import { TableEmptyState, TableRowLoading } from "@/components/CustomTable";

import { useGetAllUserBill } from "../../../../hooks/useGetAllUserBill";
import { toggleUniqueIds } from "../utils/toggleUniqueIds";

export const DaftarPenggunaSiswaTableBody = ({
  data,
  tagihanId,
  isLoading,
  selected,
  setSelect,
  setBundledUsers,
}) => {
  const { data: userBills } = useGetAllUserBill({ bill_id: tagihanId });
  if (isLoading) return <TableRowLoading columnCount={3} />;
  if (!data) return <TableEmptyState columnCount={3} />;

  const hasUserBill = (id) =>
    userBills?.find((bill) => bill.user_id === id) ? true : false;

  return data.map((student) => (
    <TableRow
      key={`${student.student_id}-${student.student_group_id}`}
      hover
      className="hover:cursor-pointer"
      onClick={
        hasUserBill(student.student_id)
          ? undefined
          : () => {
              setBundledUsers((prev) =>
                prev.filter((id) => id !== student.student_id)
              );
              toggleUniqueIds(student.student_id, setSelect);
            }
      }
    >
      <TableCell sx={{ minWidth: 0, width: "1em" }}>
        <Checkbox
          disabled={hasUserBill(student.student_id)}
          checked={selected.includes(student.student_id)}
        />
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <Typography variant="body2">{student.student_name}</Typography>
          {student.student_group_name && (
            <Typography variant="caption" color="gray">
              {student.student_group_name}
            </Typography>
          )}
        </div>
      </TableCell>
      <TableCell>Siswa</TableCell>
    </TableRow>
  ));
};
