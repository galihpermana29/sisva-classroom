import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/app/administration/store";
import type { Invoice } from "@/types/apiTypes";

type InvoiceState = {
  filteredInvoices: Invoice[];
};

const initialState: InvoiceState = {
  filteredInvoices: [],
};

const invoiceSlice = createSlice({
  name: "finance/invoice",
  initialState,
  reducers: {
    setFilteredInvoices: (state, action: PayloadAction<Invoice[]>) => {
      state.filteredInvoices = action.payload;
    },
  },
});

export const { setFilteredInvoices } = invoiceSlice.actions;

export const selectFilteredInvoices = (state: RootState) =>
  state.invoice.filteredInvoices;

const invoiceReducer = invoiceSlice.reducer;
export default invoiceReducer;
