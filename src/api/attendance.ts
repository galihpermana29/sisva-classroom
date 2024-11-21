import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getBearerToken, getSchoolId, getUserId } from ".";

const AttendanceAPI = new (class {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: "https://api-staging.sisva.id/attendance/v1",
    });
  }

  private getRequestConfig(additionalHeaders: Record<string, string> = {}): AxiosRequestConfig {
    const defaultHeaders = {
      "X-Sisva-Source": "attendance.test",
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

  getStaffAttendanceByDateId(date_id) {
    return this.api.get(`/staff?date_id=${date_id}`, this.getRequestConfig());
  }

  getStudentClassAttendanceByDateId(date_id) {
    return this.api.get(`/students?date_id=${date_id}`, this.getRequestConfig());
  }

  createStaffAttendance(id, payload) {
    return this.api.put(`/staff/${id}`, payload, this.getRequestConfig());
  }

  createStudentAttendance(id, payload) {
    return this.api.put(`/students/${id}`, payload, this.getRequestConfig());
  }
})();

export default AttendanceAPI;
