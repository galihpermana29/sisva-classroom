import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { getBearerToken, getSchoolId, getUserId } from ".";

const defaultSource = "auth.test";

const AuthAPI = new (class {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: "https://api-staging.sisva.id/tenant/v1/",
    });
  }

  private getRequestConfig(additionalHeaders: Record<string, string> = {}): AxiosRequestConfig {
    const defaultHeaders = {
      "X-Sisva-Source": defaultSource,
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

  login(payload) {
    const headers = {
      "X-Sisva-Source": defaultSource,
    };
    return this.api.post(`/user/login`, payload, {
      headers,
    });
  }

  changeUserPass(payload) {
    return this.api.patch(`/user/password`, payload, this.getRequestConfig());
  }

  resetUserPass(payload) {
    return this.api.put(`/user/password`, payload, this.getRequestConfig());
  }
})();

export default AuthAPI;
