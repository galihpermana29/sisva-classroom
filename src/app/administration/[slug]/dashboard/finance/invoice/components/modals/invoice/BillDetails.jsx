"use client";

import { formatToRupiah } from "@/utils/formatToRupiah";
import { getUserTimezone } from "@/utils/getUserTimezone";
import { Skeleton, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useGetAllInvoices } from "../../../hooks/useGetAllInvoices";
import { useGetBillById } from "../../../hooks/useGetBillById";

export const BillDetails = ({ billId, userBillId }) => {
  const timezone = getUserTimezone();
  const { data: bill, isLoading } = useGetBillById(billId);
  const { data: invoices, isStale: invoiceStale } = useGetAllInvoices({
    bill_id: billId,
  });

  const billedAmount = sumAmount(invoices);

  const amountPaid = useMemo(() => {
    const paidInvoices = invoices
      ? invoices.filter(
          (invoice) =>
            invoice.status === "done" && invoice.user_bill_id === userBillId
        )
      : [];

    const amountPaid = sumAmount(paidInvoices);

    return amountPaid;
  }, [invoiceStale, billId]);

  const amountLeft = bill ? bill.amount - amountPaid : 0;

  if (!billId || !userBillId) return;
  if (isLoading) return <LoadingBillDetail />;

  return (
    <Stack
      width="100%"
      className="grid grid-cols-2 gap-y-5"
    >
      <Stack
        width="100%"
        gap={1}
      >
        <Typography
          fontWeight={600}
          variant="body2"
        >
          Total Harga
        </Typography>
        <Typography variant="body2">{formatToRupiah(bill.amount)}</Typography>
      </Stack>
      <Stack
        width="100%"
        gap={1}
      >
        <Typography
          fontWeight={600}
          variant="body2"
        >
          Tenggat Waktu
        </Typography>
        <Typography variant="body2">
          {dayjs(bill.deadline, "DD/MM/YYYY h:mm A Z").format(
            "DD MMMM YYYY, HH:mm"
          )}{" "}
          {timezone}
        </Typography>
      </Stack>
      <Stack
        width="100%"
        gap={1}
      >
        <Typography
          fontWeight={600}
          variant="body2"
        >
          Total Tertagih
        </Typography>
        <Typography variant="body2">{formatToRupiah(billedAmount)}</Typography>
      </Stack>
      <Stack
        width="100%"
        gap={1}
      >
        <Typography
          fontWeight={600}
          variant="body2"
        >
          Sisa Tagihan
        </Typography>
        <Typography variant="body2">{formatToRupiah(amountLeft)}</Typography>
      </Stack>
    </Stack>
  );
};

const LoadingBillDetail = () => {
  return (
    <Stack
      width="100%"
      className="grid grid-cols-2 gap-5"
    >
      <Skeleton sx={{ width: "100%", height: "48px" }} />
      <Skeleton sx={{ width: "100%", height: "48px" }} />
      <Skeleton sx={{ width: "100%", height: "48px" }} />
      <Skeleton sx={{ width: "100%", height: "48px" }} />
    </Stack>
  );
};

const sumAmount = (invoices) =>
  invoices ? invoices.reduce((acc, invoice) => acc + invoice.amount, 0) : 0;
