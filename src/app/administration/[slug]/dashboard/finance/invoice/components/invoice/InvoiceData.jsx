"use client";

import { useGetUserById } from "@/hooks/query/user/useGetUserById";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { useMounted } from "@mantine/hooks";
import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useFilterStatus } from "../../hooks/useFilterStatus";
import { useGetAllInvoices } from "../../hooks/useGetAllInvoices";
import { useGetAllUserBill } from "../../hooks/useGetAllUserBill";
import { useGetBillById } from "../../hooks/useGetBillById";
import { usePagination } from "../../hooks/usePagination";
import { LoadingDataCard } from "../LoadingDataCard";
import { InvoiceRowActions } from "./InvoiceRowActions";
import { InvoiceStatusBadge } from "./InvoiceStatusBadge";

export const InvoiceData = () => {
  const theme = useTheme();
  const mounted = useMounted();
  const { page } = usePagination();
  const { data: rows, isLoading } = useGetAllInvoices({ paginated: true });

  if (isLoading || !mounted)
    return (
      <Stack gap={2}>
        {[...Array(3)].map((i) => (
          <Box
            key={i}
            className={`w-full h-52 rounded-lg animate-pulse`}
            sx={{ backgroundColor: theme.palette.base.base30 }}
          />
        ))}
      </Stack>
    );

  const data = rows[page - 1];

  return data && data.length > 0 ? (
    <Stack gap={2}>
      {data.map((row) => (
        <DataCard
          key={row.id}
          id={row.id}
          user_bill_id={row.user_bill_id}
          amount={row.amount}
          status={row.status}
        />
      ))}
    </Stack>
  ) : (
    // TODO: add empty state here
    <Stack component={Paper} alignItems="center" padding={3}>
      No data found
    </Stack>
  );
};

const DataCard = ({ id, user_bill_id, amount, status }) => {
  const { cari } = useFilterStatus();
  const { data: userBills, isError: userBillIsError } = useGetAllUserBill({
    paginated: false,
  });

  const userBill = userBills
    ? userBills.find((userBill) => userBill.id === user_bill_id)
    : undefined;

  const userId = userBill?.user_id;
  const billId = userBill?.bill_id;

  const enabled = Boolean(userId);

  const {
    data: billData,
    isLoading: billIsLoading,
    isError: billIsError,
  } = useGetBillById(billId);
  const {
    data: userData,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useGetUserById(userId, enabled);

  const isLoading = billIsLoading || userIsLoading || !enabled;
  const isError = billIsError || userIsError || userBillIsError;

  if (isLoading) return <LoadingDataCard />;
  // TODO: add error state here
  if (isError) return null;

  if (
    cari &&
    userData &&
    !userData.name.toLowerCase().includes(cari.toLowerCase())
  )
    return null;

  return (
    <Stack
      component={Paper}
      flexDirection="column"
      padding={4}
      gap={2}
      borderRadius={2}
    >
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        <Typography fontWeight={600} variant="body1">
          Invoice #{id}
        </Typography>

        <InvoiceRowActions id={id} status={status} />
      </Stack>

      <Divider orientation="horizontal" />

      <Stack flexDirection="column" gap={2}>
        <Stack flexDirection="column" gap={1}>
          <Stack flexDirection="row" alignItems="center" gap={1}>
            <Typography variant="body1">{userData.name}</Typography>
            <Typography variant="body2" color="gray">
              {userTypeMap[userData.type]}
            </Typography>
          </Stack>

          <Typography variant="body2">{billData.name}</Typography>
        </Stack>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack flexDirection="column" gap={0}>
            <Typography variant="caption" color="gray">
              Nilai Invoice:
            </Typography>

            <Typography variant="body1" fontWeight={600}>
              {formatToRupiah(amount)}
            </Typography>
          </Stack>
          <InvoiceStatusBadge>{status}</InvoiceStatusBadge>
        </Stack>
      </Stack>
    </Stack>
  );
};

const userTypeMap = {
  student: "Siswa",
  staff: "Staf",
  teacher: "Guru",
};
