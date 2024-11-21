import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getBearerToken, getSchoolId, getUserId } from ".";

const FilesAPI = new (class {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: "https://api-staging.sisva.id/file/v1",
    });
  }

  private getRequestConfig(additionalHeaders: Record<string, string> = {}): AxiosRequestConfig {
    const defaultHeaders = {
      "X-Sisva-Source": "files.test",
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

  uploadimage(formData) {
    return this.api.post("/files/", formData, this.getRequestConfig());
  }
})();

export default FilesAPI;
