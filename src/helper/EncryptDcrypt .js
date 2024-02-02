const CryptoJS = require("crypto-js");
const SECRET_KEY = "process.env.REACT_APP_SECRET_KEY";

exports.EncryptData = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
    return encryptedData;
};

exports.DcryptData = (data) => {
    const dcryptedData = JSON.parse((CryptoJS.AES.decrypt(data, SECRET_KEY)).toString(CryptoJS.enc.Utf8));
    return dcryptedData;
};