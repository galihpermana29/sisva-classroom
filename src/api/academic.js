import axios from "axios";

import { getBearerToken, getSchoolId, getUserId } from ".";

const BEARER_TOKEN = getBearerToken();
const USER_ID = getUserId();
const SCHOOL_ID = getSchoolId();

const api = axios.create({
  baseURL: "https://api-staging.sisva.id/academic/v1",
});

const AcademicAPI = {
  createProdi(payload) {
    const headers = {
      "X-Sisva-Source": "academic.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/study-programs`, payload, { headers });
  },

  getDetailProdi(id) {
    const headers = {
      "X-Sisva-Source": "academic.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/study-programs/${id}`, { headers });
  },

  getAllProdi() {
    const headers = {
      "X-Sisva-Source": "academic.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/study-programs`, { headers });
  },

  updateProdi(payload, id) {
    const headers = {
      "X-Sisva-Source": "academic.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.patch(`/study-programs/${id}`, payload, { headers });
  },

  deleteProdi(id) {
    const headers = {
      "X-Sisva-Source": "academic.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.delete(`/study-programs/${id}`, { headers });
  },

  getAllCurriculum() {
    const headers = {
      "X-Sisva-Source": "academic.curriculum.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/curriculums`, { headers });
  },

  createCurriculum(payload) {
    const headers = {
      "X-Sisva-Source": "academic.curriculum.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/curriculums`, payload, { headers });
  },

  getDetailCurriculum(id) {
    const headers = {
      "X-Sisva-Source": "academic.curriculum.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/curriculums/${id}`, { headers });
  },

  updateCurriculum(payload, id) {
    const headers = {
      "X-Sisva-Source": "academic.curriculum.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.patch(`/curriculums/${id}`, payload, { headers });
  },

  deleteCurriculum(id) {
    const headers = {
      "X-Sisva-Source": "academic.curriculum.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.delete(`/curriculums/${id}`, { headers });
  },

  getPeriodCurr() {
    const headers = {
      "X-Sisva-Source": "academic.period.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/periods/curriculums`, { headers });
  },

  getAllSubject() {
    const headers = {
      "X-Sisva-Source": "academic.curriculum.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/subjects`, { headers });
  },

  createSubject(payload) {
    const headers = {
      "X-Sisva-Source": "academic.curriculum.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/subjects`, payload, { headers });
  },

  getDetailSubject(id) {
    const headers = {
      "X-Sisva-Source": "academic.curriculum.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/subjects/${id}`, { headers });
  },

  updateSubject(payload, id) {
    const headers = {
      "X-Sisva-Source": "academic.curriculum.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.patch(`/subjects/${id}`, payload, { headers });
  },

  replaceSubjectTeacher(payload) {
    const headers = {
      "X-Sisva-Source": "academic.subjects.teachers.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.put(`/subjects/teachers`, payload, { headers });
  },

  deleteSubject(id) {
    const headers = {
      "X-Sisva-Source": "academic.curriculum.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.delete(`/subjects/${id}`, { headers });
  },

  getAllSilabus() {
    const headers = {
      "X-Sisva-Source": "academic.curriculum.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/syllabuses`, { headers });
  },

  createSilabus(payload) {
    const headers = {
      "X-Sisva-Source": "academic.curriculum.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/syllabuses`, payload, { headers });
  },

  getDetailSilabus(id) {
    const headers = {
      "X-Sisva-Source": "academic.curriculum.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/syllabuses/${id}`, { headers });
  },

  updateSilabus(payload, id) {
    const headers = {
      "X-Sisva-Source": "academic.curriculum.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.patch(`/syllabuses/${id}`, payload, { headers });
  },

  deleteSilabus(id) {
    const headers = {
      "X-Sisva-Source": "academic.curriculum.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.delete(`/syllabuses/${id}`, { headers });
  },

  createPeriod(payload) {
    const headers = {
      "X-Sisva-Source": "academic.periods.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/periods`, payload, { headers });
  },

  addCurriculumInPeriod(id, payload) {
    const headers = {
      "X-Sisva-Source": "academic.periods.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/periods/${id}/curriculums`, payload, { headers });
  },

  getAllPeriod() {
    const headers = {
      "X-Sisva-Source": "academic.periods.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/periods`, { headers });
  },

  deletePeriod(id) {
    const headers = {
      "X-Sisva-Source": "academic.periods.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.delete(`/periods/${id}`, { headers });
  },

  updatePeriod(payload, id) {
    const headers = {
      "X-Sisva-Source": "academic.periods.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.patch(`/periods/${id}`, payload, { headers });
  },

  deletePeriodCurr(id, payload) {
    const headers = {
      "X-Sisva-Source": "academic.period.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.delete(`/periods/${id}/curriculums`, {
      headers: headers,
      data: payload,
    });
  },

  getAllSubjectTeacher() {
    const headers = {
      "X-Sisva-Source": "academic.subjects.teachers.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/subjects/teachers`, { headers });
  },

  getAllClasses() {
    const headers = {
      "X-Sisva-Source": "academic.classes.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/classes`, { headers });
  },

  getAllStudentGroup() {
    const headers = {
      "X-Sisva-Source": "academic.studentgroups.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/student-groups`, { headers });
  },

  getAllStudentInGroup() {
    const headers = {
      "X-Sisva-Source": "academic.period.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/student-groups/students`, { headers });
  },

  getAllAnnouncements() {
    const headers = {
      "X-Sisva-Source": "academic.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/announcements`, { headers });
  },

  deleteAnnouncement(id) {
    const headers = {
      "X-Sisva-Source": "academic.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.delete(`/announcements/${id}`, { headers });
  },

  addAnnouncement(payload) {
    const headers = {
      "X-Sisva-Source": "academic.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/announcements`, payload, { headers });
  },

  updateAnnouncement(id, payload) {
    const headers = {
      "X-Sisva-Source": "academic.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.patch(`/announcements/${id}`, payload, { headers });
  },

  getAllClassSchedules() {
    const headers = {
      "X-Sisva-Source": "academic.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/class-schedules`, { headers });
  },

  getAllSchoolSchedules(params) {
    const headers = {
      "X-Sisva-Source": "academic.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/school-schedules?${new URLSearchParams(params)}`, {
      headers,
    });
  },

  getAllNonLearningSchedules(params) {
    const headers = {
      "X-Sisva-Source": "academic.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/non-learning-schedules?${new URLSearchParams(params)}`, {
      headers,
    });
  },

  createNonLearningSchedule(payload) {
    const headers = {
      "X-Sisva-Source": "academic.periods.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/non-learning-schedules`, payload, { headers });
  },

  createClassSchedule(payload) {
    const headers = {
      "X-Sisva-Source": "academic.periods.test",
      "X-Sisva-UserID": USER_ID,
      "X-Sisva-SchoolID": SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/class-schedules`, payload, { headers });
  },
};

export default AcademicAPI;
