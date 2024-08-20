"use client";

import { Divider, Paper, Stack, Typography } from "@mui/material";
import { useGetInvoice } from "../../hooks/useGetInvoice";
import { useMounted } from "@mantine/hooks";
import { usePagination } from "../../hooks/usePagination";
import { InvoiceStatusBadge } from "./InvoiceStatusBadge";
import { InvoiceRowActions } from "./InvoiceRowActions";

export const InvoiceData = () => {
  const mounted = useMounted();
  const { page } = usePagination();
  const { data: rows, isLoading } = useGetInvoice();

  if (isLoading || !mounted) return <div>Loading...</div>;

  const data = rows[page - 1];

  return data && data.length > 0 ? (
    <Stack gap={2}>
      {data.map((row) => (
        <DataCard
          key={row.id}
          id={row.id}
          name={row.name}
          description={row.description}
          total_price={row.total_price}
          status={row.status}
        />
      ))}
    </Stack>
  ) : (
    // TODO: add empty state here
    <span>empty</span>
  );
};

const DataCard = ({ id, name, description, total_price, status }) => {
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
          {id}
        </Typography>

        <InvoiceRowActions id={id} />
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
            {name}
          </Typography>

          <Typography variant="body2">{description}</Typography>
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
              Total harga:
            </Typography>

            <Typography
              variant="body1"
              fontWeight={600}
            >
              Rp {total_price}
            </Typography>
          </Stack>
          <InvoiceStatusBadge>{status}</InvoiceStatusBadge>
        </Stack>
      </Stack>
    </Stack>
  );
};
