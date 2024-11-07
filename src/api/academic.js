import axios from 'axios';

import { getBearerToken, getSchoolId, getUserId } from '.';

const BEARER_TOKEN = getBearerToken();
const USER_ID = getUserId();
const SCHOOL_ID = getSchoolId();

const api = axios.create({
  baseURL: 'https://api-staging.sisva.id/academic/v1',
});

const AcademicAPI = {
  /**
   * @param {Object} payload
   * @param {string} payload.name
   * @param {string} payload.code
   * @param {("active" | "inactive")} payload.status
   * @param {string[]} payload.grades
   * @returns {Promise}
   */
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

  updateProdi(payload, id) {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.patch(`/study-programs/${id}`, payload, { headers });
  },

  deleteProdi(id) {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.delete(`/study-programs/${id}`, { headers });
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

  deleteCurriculum(id) {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.delete(`/curriculums/${id}`, { headers });
  },

  getPeriodCurr() {
    const headers = {
      'X-Sisva-Source': 'academic.period.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/periods/curriculums`, { headers });
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

  replaceSubjectTeacher(payload) {
    const headers = {
      'X-Sisva-Source': 'academic.subjects.teachers.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.put(`/subjects/teachers`, payload, { headers });
  },

  deleteSubject(id) {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.delete(`/subjects/${id}`, { headers });
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

  updateSilabus(payload, id) {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.patch(`/syllabuses/${id}`, payload, { headers });
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

  deleteSilabus(id) {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.delete(`/syllabuses/${id}`, { headers });
  },

  createPeriod(payload) {
    const headers = {
      'X-Sisva-Source': 'academic.periods.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/periods`, payload, { headers });
  },

  getPeriodById(id) {
    const headers = {
      'X-Sisva-Source': 'academic.periods.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/periods/${id}`, { headers });
  },

  addCurriculumInPeriod(id, payload) {
    const headers = {
      'X-Sisva-Source': 'academic.periods.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/periods/${id}/curriculums`, payload, { headers });
  },

  getAllPeriod() {
    const headers = {
      'X-Sisva-Source': 'academic.periods.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/periods`, { headers });
  },

  deletePeriod(id) {
    const headers = {
      'X-Sisva-Source': 'academic.periods.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.delete(`/periods/${id}`, { headers });
  },

  updatePeriod(payload, id) {
    const headers = {
      'X-Sisva-Source': 'academic.periods.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.patch(`/periods/${id}`, payload, { headers });
  },

  deletePeriodCurr(id, payload) {
    const headers = {
      'X-Sisva-Source': 'academic.period.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.delete(`/periods/${id}/curriculums`, {
      headers: headers,
      data: payload,
    });
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

  getAllClasses() {
    const headers = {
      'X-Sisva-Source': 'academic.classes.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/classes`, { headers });
  },

  getAllStudentGroup() {
    const headers = {
      'X-Sisva-Source': 'academic.studentgroups.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/student-groups`, { headers });
  },

  getAllStudentInGroup() {
    const headers = {
      'X-Sisva-Source': 'academic.period.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/student-groups/students`, { headers });
  },

  createStudentGroup(payload) {
    const headers = {
      'X-Sisva-Source': 'academic.studentgroups.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/student-groups`, payload, { headers });
  },

  updateStudentGroup(id, payload) {
    const headers = {
      'X-Sisva-Source': 'academic.studentgroups.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.patch(`/student-groups/${id}`, payload, { headers });
  },

  insertStudentToStudentGroup(id, payload) {
    const headers = {
      'X-Sisva-Source': 'academic.studentgroups.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.put(`/student-groups/${id}/students`, payload, { headers });
  },

  removeStudentGroup(id) {
    const headers = {
      'X-Sisva-Source': 'academic.studentgroups.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.delete(`/student-groups/${id}`, { headers });
  },

  removeStudentFromGroup(id, payload) {
    const headers = {
      'X-Sisva-Source': 'academic.studentgroups.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.delete(`/student-groups/${id}/students`, {
      headers: headers,
      data: payload,
    });
  },

  getAllAnnouncements() {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/announcements`, { headers });
  },

  deleteAnnouncement(id) {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.delete(`/announcements/${id}`, { headers });
  },

  addAnnouncement(payload) {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/announcements`, payload, { headers });
  },

  updateAnnouncement(id, payload) {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.patch(`/announcements/${id}`, payload, { headers });
  },

  getSchoolSchedule(period_id) {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };

    return api.get(`/school-schedules?period_id=${period_id}`, { headers });
  },

  getCredit() {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };

    return api.get(`/credits`, { headers });
  },

  createCredit(payload) {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };

    return api.post('/credits', payload, { headers });
  },

  createSchoolSchedule(payload) {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };

    return api.post('/school-schedules', payload, { headers });
  },

  editSchoolSchedule(payload, id) {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };

    return api.patch(`/school-schedules/${id}`, payload, { headers });
  },

  deleteSchoolSchedule(id) {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };

    return api.delete(`/school-schedules/${id}`, { headers });
  },

  getClassSchedule(period) {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };

    return api.get(`/class-schedules?period_id=${period}`, { headers });
  },

  getNonLearningSchedule(period) {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };

    return api.get(`/non-learning-schedules?period_id=${period}`, { headers });
  },

  getAllClassSchedules(params) {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };

    return api.get(`/class-schedules?${new URLSearchParams(params)}`, {
      headers,
    });
  },

  getAllSchoolSchedules(params) {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/school-schedules?${new URLSearchParams(params)}`, {
      headers,
    });
  },

  getAllNonLearningSchedules(params) {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/non-learning-schedules?${new URLSearchParams(params)}`, {
      headers,
    });
  },

  createNonLearningSchedule(payload) {
    const headers = {
      'X-Sisva-Source': 'academic.periods.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/non-learning-schedules`, payload, { headers });
  },

  updateNonLearningSchedule(id, payload) {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.patch(`/non-learning-schedules/${id}`, payload, { headers });
  },

  createClassSchedule(payload) {
    const headers = {
      'X-Sisva-Source': 'academic.periods.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/class-schedules`, payload, { headers });
  },

  updateClassSchedule(id, payload) {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.patch(`/class-schedules/${id}`, payload, { headers });
  },

  getAllExtra() {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };

    return api.get(`/extracurriculars`, { headers });
  },

  createExtra(payload) {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/extracurriculars`, payload, { headers });
  },

  updateExtra(id, payload) {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.patch(`/extracurriculars/${id}`, payload, { headers });
  },

  deleteExtra(id) {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.delete(`/extracurriculars/${id}`, { headers });
  },

  getAllExtraStudent() {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get(`/extracurriculars/students`, { headers });
  },

  createStudentInExtra(id, payload) {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.post(`/extracurriculars/${id}/students`, payload, { headers });
  },

  deleteStudentInExtra(id, payload) {
    const headers = {
      'X-Sisva-Source': 'academic.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.delete(`/extracurriculars/${id}/students`, {
      headers: headers,
      data: payload,
    });
  },

  getStudentsInStudentGroup() {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get('/student-groups/students', { headers });
  },
  getAllTask() {
    const headers = {
      'X-Sisva-Source': 'academic.curriculum.test',
      'X-Sisva-UserID': USER_ID,
      'X-Sisva-SchoolID': SCHOOL_ID,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    };
    return api.get('/tasks', { headers });
  },
};

export default AcademicAPI;
