import { TableEmptyState, TableRowLoading } from "@/components/CustomTable";
import { Checkbox, TableCell, TableRow } from "@mui/material";
import { toggleUniqueIds } from "../utils/toggleUniqueIds";
import { useGetAllUserBill } from "../../../../hooks/useGetAllUserBill";

export const DaftarPenggunaStaffTableBody = ({
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

  return data.map((user) => (
    <TableRow
      className="hover:cursor-pointer"
      key={user.id}
      onClick={
        hasUserBill(user.id)
          ? undefined
          : () => {
              setBundledUsers((prev) => prev.filter((id) => id !== user.id));
              toggleUniqueIds(user.id, setSelect);
            }
      }
      hover
    >
      <TableCell sx={{ minWidth: 0, width: "1em" }}>
        <Checkbox
          disabled={hasUserBill(user.id)}
          checked={selected.includes(user.id)}
        />
      </TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>Staff</TableCell>
    </TableRow>
  ));
};
