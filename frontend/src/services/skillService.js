import api from './api';

export const getTechnologies = () => api.get('/skills/technologies');
export const analyzeSkills = (data) => api.post('/skills/analyze', data);
export const getAnalyses = () => api.get('/skills/analyses');
export const generateRoadmap = (data) => api.post('/skills/roadmap', data);
export const getRoadmaps = () => api.get('/skills/roadmaps');
export const getProjects = (data) => api.post('/skills/projects', data);
export const getInterviewPrep = (data) => api.post('/skills/interview', data);
export const analyzeResume = (formData) =>
  api.post('/resume/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const getDashboardStats = () => api.get('/reports/dashboard');
export const getReports = (type) =>
  api.get('/reports', { params: type ? { report_type: type } : {} });
