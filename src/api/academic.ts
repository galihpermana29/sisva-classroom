import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getBearerToken, getSchoolId, getUserId } from ".";

const AcademicAPI = new (class {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: "https://api-staging.sisva.id/academic/v1",
    });
  }

  private getRequestConfig(additionalHeaders: Record<string, string> = {}): AxiosRequestConfig {
    const defaultHeaders = {
      "X-Sisva-Source": "academic.test",
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

  createProdi(payload) {
    return this.api.post(`/study-programs`, payload, this.getRequestConfig());
  }

  getDetailProdi(id) {
    return this.api.get(`/study-programs/${id}`, this.getRequestConfig());
  }

  getAllProdi() {
    return this.api.get(`/study-programs`, this.getRequestConfig());
  }

  updateProdi(payload, id) {
    return this.api.patch(`/study-programs/${id}`, payload, this.getRequestConfig());
  }

  deleteProdi(id) {
    return this.api.delete(`/study-programs/${id}`, this.getRequestConfig());
  }

  getAllCurriculum() {
    return this.api.get(`/curriculums`, this.getRequestConfig());
  }

  createCurriculum(payload) {
    return this.api.post(`/curriculums`, payload, this.getRequestConfig());
  }

  getDetailCurriculum(id) {
    return this.api.get(`/curriculums/${id}`, this.getRequestConfig());
  }

  updateCurriculum(payload, id) {
    return this.api.patch(`/curriculums/${id}`, payload, this.getRequestConfig());
  }

  deleteCurriculum(id) {
    return this.api.delete(`/curriculums/${id}`, this.getRequestConfig());
  }

  getPeriodCurr() {
    return this.api.get(`/periods/curriculums`, this.getRequestConfig());
  }

  getAllSubject() {
    return this.api.get(`/subjects`, this.getRequestConfig());
  }

  createSubject(payload) {
    return this.api.post(`/subjects`, payload, this.getRequestConfig());
  }

  getDetailSubject(id) {
    return this.api.get(`/subjects/${id}`, this.getRequestConfig());
  }

  updateSubject(payload, id) {
    return this.api.patch(`/subjects/${id}`, payload, this.getRequestConfig());
  }

  replaceSubjectTeacher(payload) {
    return this.api.put(`/subjects/teachers`, payload, this.getRequestConfig());
  }

  deleteSubject(id) {
    return this.api.delete(`/subjects/${id}`, this.getRequestConfig());
  }

  getAllSilabus() {
    return this.api.get(`/syllabuses`, this.getRequestConfig());
  }

  createSilabus(payload) {
    return this.api.post(`/syllabuses`, payload, this.getRequestConfig());
  }

  updateSilabus(payload, id) {
    return this.api.patch(`/syllabuses/${id}`, payload, this.getRequestConfig());
  }

  getDetailSilabus(id) {
    return this.api.get(`/syllabuses/${id}`, this.getRequestConfig());
  }

  deleteSilabus(id) {
    return this.api.delete(`/syllabuses/${id}`, this.getRequestConfig());
  }

  createPeriod(payload) {
    return this.api.post(`/periods`, payload, this.getRequestConfig());
  }

  getPeriodById(id) {
    return this.api.get(`/periods/${id}`, this.getRequestConfig());
  }

  addCurriculumInPeriod(id, payload) {
    return this.api.post(`/periods/${id}/curriculums`, payload, this.getRequestConfig());
  }

  getAllPeriod() {
    return this.api.get(`/periods`, this.getRequestConfig());
  }

  deletePeriod(id) {
    return this.api.delete(`/periods/${id}`, this.getRequestConfig());
  }

  updatePeriod(payload, id) {
    return this.api.patch(`/periods/${id}`, payload, this.getRequestConfig());
  }

  deletePeriodCurr(id, payload) {
    return this.api.delete(`/periods/${id}/curriculums`, {
      headers: this.getRequestConfig().headers,
      data: payload,
    });
  }

  getAllSubjectTeacher() {
    return this.api.get(`/subjects/teachers`, this.getRequestConfig());
  }

  getAllClasses() {
    return this.api.get(`/classes`, this.getRequestConfig());
  }

  createClass(payload) {
    return this.api.post(`/classes`, payload, this.getRequestConfig());
  }

  getAllStudentGroup() {
    return this.api.get(`/student-groups`, this.getRequestConfig());
  }

  getAllStudentInGroup() {
    return this.api.get(`/student-groups/students`, this.getRequestConfig());
  }

  createStudentGroup(payload) {
    return this.api.post(`/student-groups`, payload, this.getRequestConfig());
  }

  updateStudentGroup(id, payload) {
    return this.api.patch(`/student-groups/${id}`, payload, this.getRequestConfig());
  }

  insertStudentToStudentGroup(id, payload) {
    return this.api.put(`/student-groups/${id}/students`, payload, this.getRequestConfig());
  }

  removeStudentGroup(id) {
    return this.api.delete(`/student-groups/${id}`, this.getRequestConfig());
  }

  removeStudentFromGroup(id, payload) {
    return this.api.delete(`/student-groups/${id}/students`, {
      headers: this.getRequestConfig().headers,
      data: payload,
    });
  }

  getAllAnnouncements() {
    return this.api.get(`/announcements`, this.getRequestConfig());
  }

  deleteAnnouncement(id) {
    return this.api.delete(`/announcements/${id}`, this.getRequestConfig());
  }

  addAnnouncement(payload) {
    return this.api.post(`/announcements`, payload, this.getRequestConfig());
  }

  updateAnnouncement(id, payload) {
    return this.api.patch(`/announcements/${id}`, payload, this.getRequestConfig());
  }

  getSchoolSchedule(period_id) {
    return this.api.get(`/school-schedules?period_id=${period_id}`, this.getRequestConfig());
  }

  getCredit() {
    return this.api.get(`/credits`, this.getRequestConfig());
  }

  createCredit(payload) {
    return this.api.post("/credits", payload, this.getRequestConfig());
  }

  createSchoolSchedule(payload) {
    return this.api.post("/school-schedules", payload, this.getRequestConfig());
  }

  editSchoolSchedule(payload, id) {
    return this.api.patch(`/school-schedules/${id}`, payload, this.getRequestConfig());
  }

  deleteSchoolSchedule(id) {
    return this.api.delete(`/school-schedules/${id}`, this.getRequestConfig());
  }

  getClassSchedule(period) {
    return this.api.get(`/class-schedules?period_id=${period}`, this.getRequestConfig());
  }

  getNonLearningSchedule(period) {
    return this.api.get(`/non-learning-schedules?period_id=${period}`, this.getRequestConfig());
  }

  getAllClassSchedules(params) {
    return this.api.get(`/class-schedules?${new URLSearchParams(params)}`, this.getRequestConfig());
  }

  getAllSchoolSchedules(params) {
    return this.api.get(`/school-schedules?${new URLSearchParams(params)}`, this.getRequestConfig());
  }

  getAllNonLearningSchedules(params) {
    return this.api.get(`/non-learning-schedules?${new URLSearchParams(params)}`, this.getRequestConfig());
  }

  createNonLearningSchedule(payload) {
    return this.api.post(`/non-learning-schedules`, payload, this.getRequestConfig());
  }

  updateNonLearningSchedule(id, payload) {
    return this.api.patch(`/non-learning-schedules/${id}`, payload, this.getRequestConfig());
  }

  createClassSchedule(payload) {
    return this.api.post(`/class-schedules`, payload, this.getRequestConfig());
  }

  updateClassSchedule(id, payload) {
    return this.api.patch(`/class-schedules/${id}`, payload, this.getRequestConfig());
  }

  getAllExtra() {
    return this.api.get(`/extracurriculars`, this.getRequestConfig());
  }

  createExtra(payload) {
    return this.api.post(`/extracurriculars`, payload, this.getRequestConfig());
  }

  updateExtra(id, payload) {
    return this.api.patch(`/extracurriculars/${id}`, payload, this.getRequestConfig());
  }

  deleteExtra(id) {
    return this.api.delete(`/extracurriculars/${id}`, this.getRequestConfig());
  }

  getAllExtraStudent() {
    return this.api.get(`/extracurriculars/students`, this.getRequestConfig());
  }

  createStudentInExtra(id, payload) {
    return this.api.post(`/extracurriculars/${id}/students`, payload, this.getRequestConfig());
  }

  deleteStudentInExtra(id, payload) {
    return this.api.delete(`/extracurriculars/${id}/students`, {
      headers: this.getRequestConfig().headers,
      data: payload,
    });
  }

  getStudentsInStudentGroup() {
    return this.api.get("/student-groups/students", this.getRequestConfig());
  }

  getAllTask() {
    return this.api.get("/tasks", this.getRequestConfig());
  }
})();

export default AcademicAPI;
