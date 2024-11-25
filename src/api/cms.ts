import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { getBearerToken, getSchoolId, getUserId } from ".";

const defaultSource = "cms.test";

const CMSAPI = new (class {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: "https://api-staging.sisva.id/tenant/v1",
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

  getSchoolById(id) {
    const headers = {
      "X-Sisva-Source": defaultSource,
    };
    return this.api.get(`/schools/${id}`, { headers });
  }
  getSchoolByCode(code) {
    const headers = {
      "X-Sisva-Source": defaultSource,
    };
    return this.api.get(`/schools?code=${code}`, { headers });
  }
  editSchoolById(id, payload) {
    return this.api.patch(`/schools/${id}`, payload, this.getRequestConfig());
  }
})();

export default CMSAPI;
