import api, { getBearerToken, getUserId } from ".";

const BEARER_TOKEN = getBearerToken();
const USER_ID = getUserId();
const CmsAPI = {
  getSchoolById(id) {
    const headers = {
      "X-Sisva-Source": "test",
    };

    return api.get(`/schools/${id}`, { headers });
  },
  getSchoolByCode(code) {
    const headers = {
      "X-Sisva-Source": "test",
    };

    return api.get(`/schools?code=${code}`, { headers });
  },
  editSchoolById(id, payload) {
    const headers = {
      "X-Sisva-Source": "test",
      "X-Sisva-UserID": USER_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.patch(`/schools/${id}`, payload, { headers });
  },
  updateUserPassword(payload) {
    const headers = {
      "X-Sisva-Source": "test",
      "X-Sisva-UserID": USER_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.patch(`/user/password`, payload, { headers });
  },
};

export default CmsAPI;
