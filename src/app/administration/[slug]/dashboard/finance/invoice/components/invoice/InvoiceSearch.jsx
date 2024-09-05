import { SearchInput } from "../filters/SearchInput";

/** @description Component for handling invoice search's functionalities */
export const InvoiceSearch = () => {
  return (
    <div className="min-w-max">
      <SearchInput debounceTime={200} />
    </div>
  );
};
