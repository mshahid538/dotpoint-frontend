// const axios = require('axios');
// const crypto = require('crypto');
// const fs = require('fs');
// const FormData = require('form-data');

// // These parameters should be used for all requests
// const SUMSUB_APP_TOKEN = 'YOUR_SUMSUB_APP_TOKEN'; // Example: sbx:uY0CgwELmgUAEyl4hNWxLngb.0WSeQeiYny4WEqmAALEAiK2qTC96fBad - Please don't forget to change when switching to production
// const SUMSUB_SECRET_KEY = 'YOUR_SUMSUB_SECRET_KEY'; // Example: Hej2ch71kG2kTd1iIUDZFNsO5C1lh5Gq - Please don't forget to change when switching to production
// const SUMSUB_BASE_URL = 'https://api.sumsub.com';


// var config: any = {};
// config.baseURL = SUMSUB_BASE_URL;

// axios.interceptors.request.use(createSignature, function (error: any) {
//     return Promise.reject(error);
// })

// // This function creates signature for the request as described here: https://developers.sumsub.com/api-reference/#app-tokens

// function createSignature(config: any) {
//     console.log('Creating a signature for the request...');

//     var ts = Math.floor(Date.now() / 1000);
//     const signature = crypto.createHmac('sha256', SUMSUB_SECRET_KEY);
//     signature.update(ts + config.method.toUpperCase() + config.url);

//     if (config.data instanceof FormData) {
//         signature.update(config.data.getBuffer());
//     } else if (config.data) {
//         signature.update(config.data);
//     }

//     config.headers['X-App-Access-Ts'] = ts;
//     config.headers['X-App-Access-Sig'] = signature.digest('hex');

//     return config;
// }

// // https://developers.sumsub.com/api-reference/#creating-an-applicant
// export const createApplicant = (externalUserId: any, levelName: any) => {
//     console.log("Creating an applicant...");

//     var method = 'post';
//     var url = '/resources/applicants?levelName=' + encodeURIComponent(levelName);
//     var ts = Math.floor(Date.now() / 1000);

//     var body = {
//         externalUserId: externalUserId
//     };

//     var headers = {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'X-App-Token': SUMSUB_APP_TOKEN
//     };

//     config.method = method;
//     config.url = url;
//     config.headers = headers;
//     config.data = JSON.stringify(body);

//     return config;
// }

// export const addDocument = (applicantId: any) => {
//     console.log("Adding document to the applicant...");

//     var method = 'post';
//     var url = `/resources/applicants/${applicantId}/info/idDoc`;
//     var filePath = 'resources/sumsub-logo.png';

//     var metadata = {
//         idDocType: 'PASSPORT',
//         country: 'GBR'
//     };

//     var form = new FormData();
//     form.append('metadata', JSON.stringify(metadata));

//     var content = fs.readFileSync(filePath);
//     form.append('content', content, filePath);

//     /*
//     In case you'd like to upload images in base64 encoded string format:
    
//     var content = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAMAAABlApw1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABCUExURUxpcSMudAGjmiIwdiEtdSIwdCMxdSMwdSMwdQGmlyMvdSFPfQOnmCMvdSMwdSMwdQGjmiMwdQGjmgGjmiMwdQGjmlncPbUAAAAUdFJOUwAw5lQRH0PM8CGpBhC81eBrftK5jzDo3gAAAAlwSFlzAAABwAAAAcABl8K+3QAAAuRJREFUeNrtm9typCAURXFEdMRLm6T//1fnId4qfUKDomLNWo8pwLOq7WwP0koBAAAAAAAAAAD8xzz+BPJIq377DMbeXaBBAAEEEIhHc3eBR7hAEkn2+Bhz9bmBcerH41Z3flqZ3MQRaBBAAAEEEEAAAQQQQAABBO7QCV/YHc/978IzEi8LH9EnN89Tid8n/z1XoEEAAQQQuPTf6AHp/Hlm/Z8BhQ1d/4PSyDfRiYgFmLb8yaBU8fVKqZKkFUotVCb8tU9ToBNKzRBAAAEEEhQY0hQY3gkMWfGNSpSxvGyQBXp1G3pRoLuPQIcAAgggcCnlSsCWieevM5M7q5Qd802vBuSv3aeT1vjNXY8zodfIVwVmI7/sAeuvUFa3X+UaV0lp6ov2f+YIXnspzLoHeoqKFAgggAACCCQhUJvvGDRtHIF2Wq8+SWDO7yyOwFyYrU4RqIRHjl0C2vO2QgABBBDYL2CFYm10AXEjW+qq5n66XjpFt8DSF86p1Xqmc8imgzbf5J1bwI7jjJ074XdPCN3U4S5z3QJdPo7TagOZW0B5Zqi0itSPV+IbgF078p4C4dsAYote7bvzEUAAAQR2CvTRBaRMroVhebhALixT78tfVyavsK870Z3QMUuY9ZmldiQXkn1BqwMR89d5Re2byeegPb8hK/ZtmyOAAAII7BWokheo3VPqVAXm/H2XfUImJyFgd8xNQaAKn4wAAggggICJI5CfXnc9drNVHIGpO67NOfVLnfA+gZO74w3PoGk9WCOAAAIIXNsdb+iEJdojBUw9UrgF2vx1x9o7D6d30W+642KqJSCn9fzxlid0s2/Wm/2qLWen+9jPoO5vg1Rit+uwBwIIIIDAFQK293snHF3A+e64D0hLnY/YOZMXquMEqterGTvVsik1te9vkuIIxO+Tfc8vHidwwGEPBBBAAIHzBKzzN6d1HIE21olpZyZLRNqLta5rXPfyAAAAAAAAAAAAAH7nHygtt70j9IRfAAAAV3pUWHRSYXcgcHJvZmlsZSB0eXBlIGlwdGMAAHic4/IMCHFWKCjKT8vMSeVSAAMjCy5jCxMjE0uTFAMTIESANMNkAyOzVCDL2NTIxMzEHMQHy4BIoEouAOoXEXTyQjWVAAAAAElFTkSuQmCC'
//     var ext = content.substring("data:image/".length, content.indexOf(";base64"));
//     var fileName = `image.${ext}`;
//     var base64Data = content.split(',')[1];
//     form.append('content', Buffer.from(base64Data, 'base64'), { fileName });
//     */

//     var headers = {
//         'Accept': 'application/json',
//         'X-App-Token': SUMSUB_APP_TOKEN
//     };

//     config.method = method;
//     config.url = url;
//     config.headers = Object.assign(headers, form.getHeaders());
//     config.data = form;

//     return config;
// }

// // https://developers.sumsub.com/api-reference/#getting-applicant-status-sdk
// export const getApplicantStatus = (applicantId: any) => {
//     console.log("Getting the applicant status...");

//     var method = 'get';
//     var url = `/resources/applicants/${applicantId}/status`;

//     var headers = {
//         'Accept': 'application/json',
//         'X-App-Token': SUMSUB_APP_TOKEN
//     };

//     config.method = method;
//     config.url = url;
//     config.headers = headers;
//     config.data = null;

//     return config;
// }

// // https://developers.sumsub.com/api-reference/#access-tokens-for-sdks
// export const createAccessToken = (externalUserId: any, levelName = 'basic-kyc-level', ttlInSecs = 600) => {
//     console.log("Creating an access token for initializng SDK...");

//     var method = 'post';
//     var url = '/resources/accessTokens?userId=' + encodeURIComponent(externalUserId) + '&ttlInSecs=' + ttlInSecs + '&levelName=' + encodeURIComponent(levelName);

//     var headers = {
//         'Accept': 'application/json',
//         'X-App-Token': SUMSUB_APP_TOKEN
//     };

//     config.method = method;
//     config.url = url;
//     config.headers = headers;
//     config.data = null;

//     return config;
// }

// const DummyComponent = () => {
//     return null;
// };

// export default DummyComponent;