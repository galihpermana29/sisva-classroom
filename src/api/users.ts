import axios from "axios";

import { getBearerToken, getSchoolId, getUserId } from ".";

const BEARER_TOKEN = getBearerToken();
const USER_ID = getUserId();
const SCHOOL_ID = getSchoolId();

const api = axios.create({
  baseURL: "https://api-staging.sisva.id/user/v1",
});

const UsersAPI = {
  createUser(payload) {
    const headers = {
      "X-Sisva-Source": "tenant.user.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/users`, payload, { headers });
  },

  getAllUsers(params = "staff,teacher,student") {
    const headers = {
      "X-Sisva-Source": "test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/users?types=${params}`, { headers });
  },

  getUserById(id) {
    const headers = {
      "X-Sisva-Source": "test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${getBearerToken()}`,
    };
    return api.get(`/users/${id}`, { headers });
  },

  updateUserById(payload, id) {
    const headers = {
      "X-Sisva-Source": "tenant.user.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.patch(`/users/${id}`, payload, { headers });
  },
};

export default UsersAPI;
