import { useFilterStatus } from "./useFilterStatus";

export const useCheckKategoriFilter = (bill_id) => {
  const { kategori } = useFilterStatus();

  if (!kategori) return true;
  if (!bill_id) return true;

  return bill_id === Number(kategori);
};
