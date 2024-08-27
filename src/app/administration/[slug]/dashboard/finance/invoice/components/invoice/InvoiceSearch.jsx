import { SearchInput } from "../filters/SearchInput";

/** @description Component for handling invoice search's functionalities */
export const InvoiceSearch = () => {
  return <SearchInput debounceTime={200} />;
};
