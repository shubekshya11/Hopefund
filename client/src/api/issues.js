import api from "./axios";

export const fetchIssues = (params) => api.get("/issues", { params });
export const fetchIssue = (id) => api.get(`/issues/${id}`);
export const reportIssue = (data) => api.post("/issues", data);
export const updateIssueStatus = (id, data) => api.patch(`/issues/${id}/status`, data);
