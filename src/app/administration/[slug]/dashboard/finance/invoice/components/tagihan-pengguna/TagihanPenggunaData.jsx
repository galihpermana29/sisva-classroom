"use client";

import { Divider, Paper, Stack, Typography } from "@mui/material";
import { useGetTagihanPengguna } from "../../hooks/useGetTagihanPengguna";
import { useMounted } from "@mantine/hooks";
import { usePagination } from "../../hooks/usePagination";
import { TagihanPenggunaRowActions } from "./TagihanPenggunaRowActions";

export const TagihanPenggunaData = () => {
  const mounted = useMounted();
  const { data: rows, isLoading } = useGetTagihanPengguna();
  const { page } = usePagination();

  if (isLoading || !mounted) return <div>Loading...</div>;

  const data = rows[page - 1];

  return data && data.length > 0 ? (
    <Stack gap={2}>
      {data.map((row) => (
        <DataCard
          key={row.id}
          id={row.id}
          date={row.date}
          name={row.name}
          payment={row.payment}
          total_price={row.total_price}
          total_payment={row.total_payment}
        />
      ))}
    </Stack>
  ) : (
    // TODO: add empty state here
    <span>empty</span>
  );
};

const DataCard = ({ id, date, name, payment, total_price }) => {
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
        <Stack
          flexDirection="column"
          gap={0}
        >
          <Typography
            fontWeight={600}
            variant="body2"
          >
            {id}
          </Typography>
          <Typography
            fontWeight={300}
            color="gray"
            variant="body2"
          >
            {date}
          </Typography>
        </Stack>

        <TagihanPenggunaRowActions id={id} />
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

          <Typography variant="body2">{payment}</Typography>
        </Stack>
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
      </Stack>
    </Stack>
  );
};
