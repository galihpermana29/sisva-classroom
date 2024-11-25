"use client";

import { useTheme } from "@emotion/react";
import { useMounted } from "@mantine/hooks";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

import { formatToRupiah } from "@/utils/formatToRupiah";

import { useGetTagihan } from "../../hooks/useGetTagihan";
import { usePagination } from "../../hooks/usePagination";
import JumlahPembayaranTagihan from "../tables/tagihan/JumlahPembayaranTagihan";
import { TagihanRowActions } from "./TagihanRowActions";
import { TagihanStatusBadge } from "./TagihanStatusBadge";

export const TagihanData = () => {
  const theme = useTheme();
  const mounted = useMounted();
  const { data: rows, isLoading } = useGetTagihan();
  const { page } = usePagination();

  if (isLoading || !mounted)
    return (
      <Stack gap={2}>
        {[...Array(3)].map((i) => (
          <Box
            key={i}
            className={`w-full h-52 rounded-lg animate-pulse`}
            sx={{ backgroundColor: theme.palette.base.base30 }}
          ></Box>
        ))}
      </Stack>
    );

  const data = rows[page - 1];

  return data && data.length > 0 ? (
    <Stack gap={2}>
      {data.map((row) => (
        <DataCard key={row.id} data={row} />
      ))}
    </Stack>
  ) : (
    <div className="flex w-full justify-center">
      <iframe src="https://lottie.host/embed/b5db43dc-864b-4e2d-8ad1-042536dbe95b/O1cPFK7CcS.json"></iframe>
    </div>
  );
};

function formatDate(dateString) {
  const date = dayjs(dateString, "DD/MM/YYYY h:mm A Z");
  return date.format("DD MMM YYYY");
}

const DataCard = ({ data }) => {
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
        width={"100%"}
        gap={2}
      >
        <Stack flexDirection="column" gap={0}>
          <Typography fontWeight={600} variant="body2">
            #{Boolean(data.custom_id) ? data.custom_id : data.id}
          </Typography>
          <Typography fontWeight={300} color="gray" variant="body2">
            {formatDate(data.deadline)}
          </Typography>
        </Stack>

        <TagihanRowActions id={data.id} data={data} />
      </Stack>

      <Divider orientation="horizontal" />

      <Stack flexDirection="column" gap={2}>
        <Stack flexDirection="column" gap={1}>
          <Stack>
            <Typography className="text-sm text-gray-400">
              <JumlahPembayaranTagihan bill_id={data.id} />
            </Typography>
            <Typography variant="body1" fontSize={16}>
              {data.name}
            </Typography>
          </Stack>

          <Typography variant="body2">{data.payment}</Typography>
        </Stack>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"end"}
        >
          <Stack flexDirection="column" gap={0}>
            <Typography variant="caption" color="gray">
              Total harga:
            </Typography>

            <Typography variant="body1" fontWeight={600}>
              {formatToRupiah(data.amount)}
            </Typography>
          </Stack>
          <TagihanStatusBadge>{data.status}</TagihanStatusBadge>
        </Stack>
      </Stack>
    </Stack>
  );
};
