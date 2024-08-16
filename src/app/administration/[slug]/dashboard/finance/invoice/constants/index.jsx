import Tagihan from "../components/tabs/Tagihan";
import { TagihanPengguna } from "../components/tabs/TagihanPengguna";
import { TagihanPenggunaActions } from "../components/tagihan-pengguna/TagihanPenggunaActions";
import { TagihanPenggunaFilters } from "../components/tagihan-pengguna/TagihanPenggunaFilters";
import { TagihanPenggunaSearch } from "../components/tagihan-pengguna/TagihanPenggunaSearch";
import { TagihanFilters } from "../components/tagihan/TagihanFilters";
import { TagihanSearch } from "../components/tagihan/TagihanSearch";

/** Default active invoice tab */
export const DEFAULT_INVOICE_TAB = 0;
/** The available tabs for invoice page */
export const INVOICE_TABS = [
  {
    title: "Tagihan",
    component: <Tagihan />,
    actions: <div>Tagihan Actions</div>,
    search: <TagihanSearch />,
    filters: <TagihanFilters />,
  },
  {
    title: "Tagihan Pengguna",
    component: <TagihanPengguna />,
    actions: <TagihanPenggunaActions />,
    search: <TagihanPenggunaSearch />,
    filters: <TagihanPenggunaFilters />,
  },
  {
    title: "Invoice",
    component: <div>Invoice</div>,
    actions: <div>Invoice Actions</div>,
    search: <div>Invoice Search</div>,
    filters: <div>Tagihan Pengguna Filters</div>,
  },
];
