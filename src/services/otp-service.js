import { myAxios } from "./helper";

export const sendOTPApi=(userDetails) =>{
    return myAxios.post('/api/v1/email/send-otp',userDetails).then((response)=>response.data);
};

export const resendOTPApi=(userDetails) =>{
    return myAxios.post('/api/v1/email/resend-otp',userDetails).then((response)=>response.data);
};

export const verifyOTPApi=(otpDetails,data) =>{
    // console.log(data);
    // return myAxios.post(`/api/v1/email/verify-otp?otp=${otpDetails.eotp}`+`&email=${otpDetails.emailId}`,data).then((response)=>response.data);
    return myAxios.post(`/api/v1/email/verify-otp?otp=${otpDetails.eotp}`,data).then((response)=>response.data);
};