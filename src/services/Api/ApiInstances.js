import axios from "axios";

export const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

// Login api
export const LOGIN = (data) => API.post('/auth/admin/login', data);
// Registration api
export const REGISTRATION = (data) => API.post('/auth/admin/registration', data);
// create QR code
export const CREATEQRCODE = (data) => API.post('/qrcode/create', data);
// get QRcode tags
export const QRCODETAGS = () => API.get('/qrcode/tags');
// get QRcode
export const GETQRCODE = (flag, page, pageSize) => API.get(`/qrcode/get/${flag}`, { params: { page, pageSize } });
// get download Pdf
export const DOWNLOADPDF = (flag) => API.get(`/qrcode/pdf/${flag}`);
// dashboard data
export const DASHBOARDDATA = () => API.get(`/dashboard/data`);
// report data
export const REPORTDATA = () => API.get(`/report/data`);
// download report data
export const DOWNLOADREPORTDATA = () => API.get(`/report/download-excel`);






export const api = axios.create({ baseURL: process.env.REACT_APP_NODE_HOST });

// store feedback data
export const STOREFEEDBACKDATA = (data, uuid) => api.post(`/sl/sm/${uuid}`, data);