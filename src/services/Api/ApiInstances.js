import axios from "axios";

export const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

// Login api
export const LOGIN = (data) => API.post('/auth/admin/login', data);
// Registration api
export const REGISTRATION = (data) => API.post('/auth/admin/registration', data);
// create QR code
export const CREATEQRCODE = (data, header) => API.post('/qrcode/create', data, header);
// get QRcode tags
export const QRCODETAGS = (header) => API.get('/qrcode/tags', header);
// get QRcode
export const GETQRCODE = (flag, page, pageSize, header) => API.get(`/qrcode/get/${flag}`, header, { params: { page, pageSize } });
// get download Pdf
export const DOWNLOADPDF = (flag, header) => API.get(`/qrcode/pdf/${flag}`, header);
// dashboard data
export const DASHBOARDDATA = (header) => API.get(`/dashboard/data`, header);
// report data
export const REPORTDATA = (header) => API.get(`/report/data`, header);
// download report data
export const DOWNLOADREPORTDATA = (header) => API.get(`/report/download-excel`, header);






export const api = axios.create({ baseURL: process.env.REACT_APP_NODE_HOST });

// store feedback data
export const STOREFEEDBACKDATA = (data, uuid) => api.post(`/sl/sm/${uuid}`, data);
// cashback data
export const CASHBACKBACKDATA = (data) => api.post(`/sl/sm/cashback/form`, data);