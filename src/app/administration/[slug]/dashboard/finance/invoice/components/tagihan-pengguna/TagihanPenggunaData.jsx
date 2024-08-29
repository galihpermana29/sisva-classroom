"use client";

import { useGetUserById } from "@/hooks/useGetUserById";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { getUserTimezone } from "@/utils/getUserTimezone";

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

import { useCheckCariFilter } from "../../hooks/useCheckCariFilter";
import { useCheckKategoriFilter } from "../../hooks/useCheckKategoriFilter";
import { useCheckTanggalFilter } from "../../hooks/useCheckTanggalFilter";
import { useGetAllUserBill } from "../../hooks/useGetAllUserBill";
import { useGetBillById } from "../../hooks/useGetBillById";
import { usePagination } from "../../hooks/usePagination";

import { LoadingDataCard } from "../LoadingDataCard";
import { DeleteTagihanPenggunaModal } from "../modals/tagihan-pengguna/DeleteTagihanPenggunaModal";

export const TagihanPenggunaData = () => {
  const theme = useTheme();
  const mounted = useMounted();
  const { data: rows, isLoading } = useGetAllUserBill({ paginated: true });
  const { page } = usePagination();

  // TODO: add overall loading state here
  if (isLoading || !mounted)
    return (
      <Stack gap={2}>
        {[...Array(3)].map(() => (
          <Box
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
          {...row}
        />
      ))}
    </Stack>
  ) : (
    // TODO: add empty state here
    <span>empty</span>
  );
};

const DataCard = ({ id, bill_id, user_id }) => {
  const cariFilterPass = useCheckCariFilter(user_id);
  const kategoriFilterPass = useCheckKategoriFilter(user_id);
  const tanggalFilterPass = useCheckTanggalFilter(bill_id);

  const {
    data: billData,
    isLoading: billIsLoading,
    isError: billIsError,
  } = useGetBillById(bill_id);
  const {
    data: userData,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useGetUserById(user_id);

  const isLoading = userIsLoading || billIsLoading;
  const isError = userIsError || billIsError;

  if (isLoading) return <LoadingDataCard />;
  // TODO: add error state here
  if (isError) return null;
  // TODO: add empty state here
  if (!cariFilterPass || !tanggalFilterPass || !kategoriFilterPass) return null;

  const date = dayjs(billData.deadline, "DD/MM/YYYY h:mm A Z");
  const timezone = getUserTimezone();

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
            #{billData.custom_id}
          </Typography>
          <Typography
            fontWeight={300}
            color="gray"
            variant="body2"
          >
            {`${date.format("DD MMM YYYY")} ${date.format(
              "HH:mm"
            )} ${timezone}`}
          </Typography>
        </Stack>

        <DeleteTagihanPenggunaModal id={id} />
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
            {formatToRupiah(billData.amount)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
