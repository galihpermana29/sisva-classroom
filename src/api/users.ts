import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getBearerToken, getSchoolId, getUserId } from ".";

const UsersAPI = new (class {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: "https://api-staging.sisva.id/user/v1",
    });
  }

  private getRequestConfig(
    additionalHeaders: Record<string, string> = {}
  ): AxiosRequestConfig {
    const defaultHeaders = {
      "X-Sisva-Source": "tenant.user.test",
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

  async createUser(payload: any) {
    return this.api.post("/users", payload, this.getRequestConfig());
  }

  async getAllUsers(params: string = "staff,teacher,student") {
    return this.api.get(`/users?types=${params}`, this.getRequestConfig());
  }

  async getUserById(id: string | number) {
    return this.api.get(`/users/${id}`, this.getRequestConfig());
  }

  async updateUserById(payload: any, id: string) {
    return this.api.patch(`/users/${id}`, payload, this.getRequestConfig());
  }
})();

export default UsersAPI;
