import axios from 'axios';

import { getBearerToken, getSchoolId, getUserId } from '.';

const BEARER_TOKEN = getBearerToken();
const USER_ID = getUserId();
const SCHOOL_ID = getSchoolId();

const api = axios.create({
  baseURL: 'https://api-staging.sisva.id/academic/v1',
});

const AcademicAPI = {
  createProdi(payload) {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/study-programs`, payload, { headers });
  },

  getDetailProdi(id) {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/study-programs/${id}`, { headers });
  },

  getAllProdi() {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/study-programs`, { headers });
  },

  editProdi(payload, id) {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.patch(`/study-programs/${id}`, payload, { headers });
  },

  getAllCurriculum() {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/curriculums`, { headers });
  },

  createCurriculum(payload) {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/curriculums`, payload, { headers });
  },

  getDetailCurriculum(id) {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/curriculums/${id}`, { headers });
  },

  updateCurriculum(payload, id) {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.patch(`/curriculums/${id}`, payload, { headers });
  },

  getAllSubject() {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/subjects`, { headers });
  },

  createSubject(payload) {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/subjects`, payload, { headers });
  },

  getDetailSubject(id) {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/subjects/${id}`, { headers });
  },

  updateSubject(payload, id) {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.patch(`/subjects/${id}`, payload, { headers });
  },

  getAllSilabus() {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/syllabuses`, { headers });
  },

  createSilabus(payload) {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/syllabuses`, payload, { headers });
  },

  getDetailSilabus(id) {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/syllabuses/${id}`, { headers });
  },

  updateSilabus(payload, id) {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.patch(`/syllabuses/${id}`, payload, { headers });
  },

  getAllPeriod() {
    const headers = {
      'X-Sisva-Source': 'academic.subjects.teachers.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/periods`, { headers });
  },

  getAllSubjectTeacher() {
    const headers = {
      'X-Sisva-Source': 'academic.subjects.teachers.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/subjects/teachers`, { headers });
  },
};

export default AcademicAPI;
