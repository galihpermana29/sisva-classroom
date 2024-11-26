"use client";

import { useMounted } from "@mantine/hooks";
import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";

import { formatToRupiah } from "@/utils/formatToRupiah";
import { getUserTimezone } from "@/utils/getUserTimezone";

import usePaginatedFilteredUserBills from "../../hooks/usePaginatedFilteredUserBills";
import { usePagination } from "../../hooks/usePagination";
import { DeleteTagihanPenggunaModal } from "../modals/tagihan-pengguna/DeleteTagihanPenggunaModal";

export const TagihanPenggunaData = () => {
  const theme = useTheme();
  const mounted = useMounted();
  const { page } = usePagination();
  const { paginatedUserBills: rows, isFetching } =
    usePaginatedFilteredUserBills();

  // TODO: add overall loading state here
  if (isFetching || !mounted)
    return (
      <Stack gap={2}>
        {[...Array(3)].map((_, i) => (
          <Box
            key={i}
            className={`w-full h-52 rounded-lg animate-pulse`}
            sx={{ backgroundColor: "base.base30" }}
          />
        ))}
      </Stack>
    );
  const timezone = getUserTimezone();

  const data = rows[page - 1];

  return data && data.length > 0 ? (
    <Stack gap={2}>
      {data.map((row) => {
        const date = dayjs(row.bill?.deadline, "DD/MM/YYYY h:mm A Z");
        return (
          <Stack
            component={Paper}
            flexDirection="column"
            padding={4}
            gap={2}
            borderRadius={2}
            key={row.id}
          >
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              <Stack flexDirection="column" gap={0}>
                <Typography fontWeight={600} variant="body2">
                  #{row.bill?.custom_id}
                </Typography>
                <Typography fontWeight={300} color="gray" variant="body2">
                  {`${date.format("DD MMM YYYY")} ${date.format(
                    "HH:mm"
                  )} ${timezone}`}
                </Typography>
              </Stack>

              <DeleteTagihanPenggunaModal
                id={row.id}
                billId={row.bill?.id}
                userId={row.user?.id}
              />
            </Stack>
            <Divider orientation="horizontal" />
            <Stack flexDirection="column" gap={2}>
              <Stack flexDirection="column" gap={1}>
                <Typography variant="body1" fontSize={16}>
                  {row.user?.name}
                </Typography>

                <Typography variant="body2">{row.bill?.name}</Typography>
              </Stack>
              <Stack flexDirection="column" gap={0}>
                <Typography variant="caption" color="gray">
                  Total harga:
                </Typography>

                <Typography variant="body1" fontWeight={600}>
                  {formatToRupiah(row.bill?.amount)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  ) : (
    // TODO: add empty state here
    <span>empty</span>
  );
};
