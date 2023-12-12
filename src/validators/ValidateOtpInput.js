export const ValidateOtpInput=(data)=>{
    const fields = Object.keys(data);
    const errorFields = {};

    // console.log(data);
    // data["eotp"]
    if(data=="" || data.length==0)
    {
        // let field = "otp";
        errorFields["otp"] = "cannot be empty";
        // console.log("OTP cannot be empty");
        // errorFields[field] = "otp";
        // return false;
    }
    if(data?.length<6)
    {
        // let field = "otp";
        errorFields["otp"] = "must be of 6 characters";
        // console.log("OTP must be of 6 characters");
        // errorFields[field] = "otp";
        // return false;
    }
    // console.log(errorFields);
    return errorFields;
}