const CryptoJS = require("crypto-js");
const SECRET_KEY = "fezeewshard0&retryWritestrue&wmajority&ssltrueisi";

exports.EncryptData = (data) => {
    try {
        const encryptedData = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
        return encryptedData;
    } catch (error) {
        console.log({ error });
        return null;
    }
};

exports.DcryptData = (data) => {
    try {
        const decryptedData = JSON.parse(CryptoJS.AES.decrypt(data, SECRET_KEY).toString(CryptoJS.enc.Utf8));
        return decryptedData;
    } catch (error) {
        console.log({ error });
        return null;
    }
};
