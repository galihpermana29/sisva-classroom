import api, { getBearerToken, getUserId, getSchoolId } from '.';

const BEARER_TOKEN = getBearerToken();
const USER_ID = getUserId();
const SCHOOL_ID = getSchoolId();

const AuthAPI = {
  login(payload) {
    const headers = {
      'X-Sisva-Source': 'test',
    };

    return api.post(`/user/login`, payload, { headers });
  },

  changeUserPass(payload) {
    const headers = {
      'X-Sisva-Source': 'test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };

    return api.patch(`/user/password`, payload, { headers });
  },

  resetUserPass(payload) {
    const headers = {
      'X-Sisva-Source': 'test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };

    return api.put(`/user/password`, payload, { headers });
  },
};

export default AuthAPI;
