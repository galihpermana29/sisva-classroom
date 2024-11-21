import { createQueryParam } from "@/utils/createQueryParam";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getBearerToken, getSchoolId, getUserId } from ".";

const FinanceAPI = new (class {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: "https://api-staging.sisva.id/finance/v1",
    });
  }

  private getRequestConfig(additionalHeaders: Record<string, string> = {}): AxiosRequestConfig {
    const defaultHeaders = {
      "X-Sisva-Source": "finance.test",
      "X-Sisva-UserID": getUserId(),
      "X-Sisva-SchoolID": getSchoolId(),
      Authorization: `Bearer ${getBearerToken()}`,
    };

    return {
      headers: {
        ...defaultHeaders,
        ...additionalHeaders,
      },
    };
  }

  updateInvoice(id, payload) {
    return this.api.patch(`/invoices/${id}`, payload, this.getRequestConfig());
  }

  updateBill(id, payload) {
    return this.api.patch(`/bills/${id}`, payload, this.getRequestConfig());
  }

  updatePaymentProof(id, payload) {
    return this.api.patch(`/invoices/${id}/payment-proof`, payload, this.getRequestConfig());
  }

  createBill(payload) {
    return this.api.post("/bills", payload, this.getRequestConfig());
  }

  createUserBill(payload) {
    return this.api.post("/user-bills", payload, this.getRequestConfig());
  }

  createInvoice(payload) {
    return this.api.post("/invoices", payload, this.getRequestConfig());
  }

  getAllInvoices({ bill_id, user_id }) {
    const params = createQueryParam([
      { name: "bill_id", value: bill_id },
      { name: "user_id", value: user_id },
    ]);
    return this.api.get(`/invoices?${params}`, this.getRequestConfig());
  }

  getAllBills({ bill_id }) {
    const params = createQueryParam({ name: "bill_id", value: bill_id });
    return this.api.get(`/bills?${params}`, this.getRequestConfig());
  }

  getBillById(id) {
    return this.api.get(`/bills/${id}`, this.getRequestConfig());
  }

  getInvoiceById(id) {
    return this.api.get(`/invoices/${id}`, this.getRequestConfig());
  }

  getAllUserBill() {
    return this.api.get("/user-bills", this.getRequestConfig());
  }

  deleteInvoice(id) {
    return this.api.delete(`/invoices/${id}`, this.getRequestConfig());
  }

  deleteBill(id) {
    return this.api.delete(`/bills/${id}`, this.getRequestConfig());
  }

  deleteUserBill(id) {
    return this.api.delete(`/user-bills/${id}`, this.getRequestConfig());
  }
})();

export default FinanceAPI;
