import { TableCellLoading, TableEmptyState } from "@/components/CustomTable";
import { useGetUserById } from "@/hooks/useGetUserById";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { Delete } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useGetBillById } from "../../../../hooks/useGetBillById";
import { toggleUniqueIds } from "../utils/toggleUniqueIds";

export const DaftarPenggunaTerpilihTableBody = ({
  tagihanId,
  selectedUsers,
  setSelectedUsers,
  columnCount,
  bundledUsers,
  setBundledUsers,
}) => {
  if (!selectedUsers || selectedUsers.length === 0)
    return <TableEmptyState columnCount={columnCount} />;

  return selectedUsers.map((id, index) => (
    <TableRow key={id} hover>
      <TableCell sx={{ minWidth: 0, width: "1em" }} className="text-center">
        {index + 1}.
      </TableCell>
      <NameCell userId={id} />
      <PembayaranCell tagihanId={tagihanId} />
      <TotalHargaCell tagihanId={tagihanId} />
      <TableCell>
        <Checkbox
          onClick={() => toggleUniqueIds(id, setBundledUsers)}
          checked={bundledUsers?.includes(id)}
        />
      </TableCell>
      <TableCell>
        <IconButton
          onClick={() => toggleUniqueIds(id, setSelectedUsers)}
          aria-label="hapus"
          size="small"
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  ));
};

const NameCell = ({ userId }) => {
  const { data, isLoading } = useGetUserById(userId);
  if (isLoading) return <TableCellLoading />;
  return (
    <TableCell>
      <div className="flex flex-col">
        <Typography variant="body2">{data?.name}</Typography>
        <Typography variant="caption" color="gray">
          {userTypeMap[data?.type]}
        </Typography>
      </div>
    </TableCell>
  );
};

const PembayaranCell = ({ tagihanId }) => {
  const { data, isLoading } = useGetBillById(tagihanId);
  if (isLoading) return <TableCellLoading />;
  return <TableCell>{data?.name ?? "-"}</TableCell>;
};

const TotalHargaCell = ({ tagihanId }) => {
  const { data, isLoading } = useGetBillById(tagihanId);
  if (isLoading) return <TableCellLoading />;
  return <TableCell>{data ? formatToRupiah(data.amount) : "-"}</TableCell>;
};

const userTypeMap = {
  student: "Siswa",
  staff: "Staff",
  teacher: "Guru",
};
