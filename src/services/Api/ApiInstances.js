import axios from "axios";

export const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

// create QR code
export const CREATEQRCODE = (data) => API.post('/qrcode/create', data);
// get QRcode tags
export const QRCODETAGS = () => API.get('/qrcode/tags');
// get QRcode
export const GETQRCODE = (flag, page, pageSize) => API.get(`/qrcode/get/${flag}`, { params: { page, pageSize } });