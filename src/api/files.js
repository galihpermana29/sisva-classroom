import api, { getBearerToken, getSchoolId, getUserId } from '.';

const BEARER_TOKEN = getBearerToken();
const USER_ID = getUserId();
const SCHOOL_ID = getSchoolId();

const FilesAPI = {
  uploadimage(formData) {
    const url = 'https://api-staging.sisva.id/file/v1/files/';
    const headers = {
      'X-Sisva-Source': 'test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };

    return api.post(url, formData, {
      headers,
    });
  },
};

export default FilesAPI;
