"use client";

import { Divider, Paper, Stack, Typography } from "@mui/material";
import { useMounted } from "@mantine/hooks";
import { usePagination } from "../../hooks/usePagination";
import { InvoiceStatusBadge } from "./InvoiceStatusBadge";
import { InvoiceRowActions } from "./InvoiceRowActions";
import { useGetAllInvoices } from "../../hooks/useGetAllInvoices";
import { useGetAllUserBill } from "../../hooks/useGetAllUserBill";
import { useFilterStatus } from "../../hooks/useFilterStatus";
import { useGetBillById } from "../../hooks/useGetBillById";
import { useGetUserById } from "@/hooks/useGetUserById";
import { LoadingDataCard } from "../LoadingDataCard";
import { formatToRupiah } from "@/utils/formatToRupiah";

export const InvoiceData = () => {
  const mounted = useMounted();
  const { page } = usePagination();
  const { data: rows, isLoading } = useGetAllInvoices({ paginated: true });

  if (isLoading || !mounted) return <div>Loading...</div>;

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
    <span>empty</span>
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
        <Typography
          fontWeight={600}
          variant="body1"
        >
          Invoice #{id}
        </Typography>

        <InvoiceRowActions
          id={id}
          status={status}
        />
      </Stack>

      <Divider orientation="horizontal" />

      <Stack
        flexDirection="column"
        gap={2}
      >
        <Stack
          flexDirection="column"
          gap={1}
        >
          <Typography
            variant="body1"
            fontSize={16}
          >
            {userData.name}
          </Typography>

          <Typography variant="body2">{billData.name}</Typography>
        </Stack>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            flexDirection="column"
            gap={0}
          >
            <Typography
              variant="caption"
              color="gray"
            >
              Nilai Invoice:
            </Typography>

            <Typography
              variant="body1"
              fontWeight={600}
            >
              {formatToRupiah(amount)}
            </Typography>
          </Stack>
          <InvoiceStatusBadge>{status}</InvoiceStatusBadge>
        </Stack>
      </Stack>
    </Stack>
  );
};
