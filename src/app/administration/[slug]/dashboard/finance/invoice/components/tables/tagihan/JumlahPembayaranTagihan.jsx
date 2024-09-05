import { useMounted } from "@mantine/hooks";
import { Skeleton } from "@mui/material";
import { useGetAllInvoices } from "../../../hooks/useGetAllInvoices";

function JumlahPembayaranTagihan({ bill_id }) {
  const mounted = useMounted();

  const { data, isLoading } = useGetAllInvoices({ bill_id });

  const paidData = data?.filter(({ status }) => status === "done");

  if (isLoading || !mounted)
    return <Skeleton sx={{ height: "1.25rem", width: "100%" }} />;

  return (
    <span>
      {paidData?.length}/{data?.length}
    </span>
  );
}

export default JumlahPembayaranTagihan;
