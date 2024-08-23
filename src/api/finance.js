import axios from "axios";

import { getBearerToken, getSchoolId, getUserId } from ".";
import { createQueryParam } from "@/utils/createQueryParam";

const BEARER_TOKEN = getBearerToken();
const USER_ID = getUserId();
const SCHOOL_ID = getSchoolId();

const api = axios.create({
  baseURL: "https://api-staging.sisva.id/finance/v1",
});

const headers = {
  "X-Sisva-Source": "academic.curriculum.test",
  "X-Sisva-UserID": USER_ID,
  "X-Sisva-SchoolID": SCHOOL_ID,
  Authorization: `Bearer ${BEARER_TOKEN}`,
};

export const FinanceAPI = {
  updateInvoice(id, payload) {
    return api.patch(`/invoices/${id}`, payload, { headers });
  },

  updateBill(id, payload) {
    return api.patch(`/bills/${id}`, payload, { headers });
  },

  createBill(payload) {
    return api.post("/bills", payload, { headers });
  },

  createUserBill(payload) {
    return api.post("/user-bills", payload, { headers });
  },

  createInvoice(payload) {
    return api.post("/invoices", payload, { headers });
  },

  getAllInvoices({ bill_id, user_id }) {
    const params = createQueryParam([
      { name: "bill_id", value: bill_id },
      { name: "user_id", value: user_id },
    ]);
    return api.get(`/invoices?${params}`, { headers });
  },

  getAllBills({ bill_id }) {
    const params = createQueryParam({ name: "bill_id", value: bill_id });
    return api.get(`/bills?${params}`, { headers });
  },

  getBillById(id) {
    return api.get(`/bills/${id}`, { headers });
  },

  getInvoiceById(id) {
    return api.get(`/invoices/${id}`, { headers });
  },

  getAllUserBill() {
    return api.get("/user-bills", { headers });
  },

  deleteInvoice(id) {
    return api.delete(`/invoice/${id}`, { headers });
  },

  deleteBill(id) {
    return api.delete(`/bills/${id}`, { headers });
  },

  deleteUserBill(id) {
    return api.delete(`/user-bills/${id}`, { headers });
  },
};
