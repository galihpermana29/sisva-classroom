import { SearchInput } from "../filters/SearchInput";

/** @description Component for handling tagihan pengguna search's functionalities */
export const TagihanPenggunaSearch = () => {
  return (
    <div className="min-w-max">
      <SearchInput debounceTime={200} />
    </div>
  );
};
