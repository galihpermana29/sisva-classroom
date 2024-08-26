import { FieldLabel } from "@/components/FieldLabel";
import { Stack } from "@mui/material";
import { ModalTagihanSelect } from "./ModalTagihanSelect";
import { ModalTargetSelect } from "./ModalTargetSelect";

export const ModalFilters = ({
  tagihanId,
  setTagihanId,
  setAvailableTarget,
  availableTarget,
  target,
  setTarget,
}) => {
  return (
    <Stack
      width="100%"
      flexDirection="row"
      flexWrap={{ xs: "wrap", md: "nowrap" }}
      gap={{ xs: 2, md: 1 }}
    >
      <FieldLabel name="Pilih Tagihan">
        <ModalTagihanSelect
          value={tagihanId}
          setValue={setTagihanId}
          setAvailableTarget={setAvailableTarget}
        />
      </FieldLabel>
      <FieldLabel name="Target">
        <ModalTargetSelect
          data={availableTarget}
          value={target}
          setValue={setTarget}
          disabled={!Boolean(tagihanId)}
        />
      </FieldLabel>
    </Stack>
  );
};
