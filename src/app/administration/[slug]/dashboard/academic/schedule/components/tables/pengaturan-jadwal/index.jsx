import { TableCell, TableRow } from "@mui/material";
import dynamic from "next/dynamic";

import { CustomTable, TableEmptyState } from "@/components/CustomTable";

// disable prerendering to avoid hydration error
// no idea why we should do this
const ActionButtons = dynamic(
  () => import("./ActionButtons").then(({ ActionButtons }) => ActionButtons),
  {
    ssr: false,
  }
);

export const PengaturanJadwalTable = () => {
  // define table columns here
  const columns = ["Hari", "Jam Mulai", "Jam Selesai", "Action"];

  return (
    <CustomTable
      columns={columns}
      minWidth={650}
      body={<PengaturanJadwalTableBody columnCount={columns.length} />}
    />
  );
};

const PengaturanJadwalTableBody = async ({ columnCount }) => {
  // simulate loading
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(1000);

  // fetch data from this component
  const rows = [
    { id: 1, day: "Senin", start_time: "07:00", end_time: "16:00" },
    { id: 2, day: "Selasa", start_time: "07:00", end_time: "16:00" },
    { id: 3, day: "Rabu", start_time: "07:00", end_time: "16:00" },
    { id: 4, day: "Kamis", start_time: "07:00", end_time: "16:00" },
    { id: 5, day: "Jum'at", start_time: "07:00", end_time: "13:00" },
    { id: 6, day: "Sabtu", start_time: "07:00", end_time: "10:00" },
  ];

  return rows && rows.length > 0 ? (
    rows.map((row) => (
      <TableRow className="even:bg-gray-100/60" hover key={row.id}>
        <TableCell>{row.day}</TableCell>
        <TableCell>{row.start_time}</TableCell>
        <TableCell>{row.end_time}</TableCell>
        <TableCell>
          <ActionButtons data={row} />
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableEmptyState columnCount={columnCount} />
  );
};
