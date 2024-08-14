import axios from 'axios';

import { getBearerToken, getSchoolId, getUserId } from '.';

const BEARER_TOKEN = getBearerToken();
const USER_ID = getUserId();
const SCHOOL_ID = getSchoolId();

const api = axios.create({
  baseURL: 'https://api-staging.sisva.id/attendance/v1',
});

const AttendanceApi = {
  getStaffAttendanceByDateId(date_id) {
    const headers = {
      'X-Sisva-Source': 'attendance.staff.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/staff?date_id=${date_id}`, { headers });
  },

  getStudentClassAttendanceByDateId(date_id) {
    const headers = {
      'X-Sisva-Source': 'attendance.students.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/students?date_id=${date_id}`, { headers });
  },

  createStaffAttendance(id, payload) {
    const headers = {
      'X-Sisva-Source': 'attendance.tasks.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.put(`/staff/${id}`, payload, { headers });
  },

  createStudentAttendance(id, payload) {
    const headers = {
      'X-Sisva-Source': 'attendance.tasks.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.put(`/students/${id}`, payload, { headers });
  },
};

export default AttendanceApi;
