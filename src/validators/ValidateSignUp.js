import { useState } from "react";
import { Toasts } from "../components/Toasts"

export const ValidateSignUp=(formData)=>{
    // Toasts('info',"Inside ValidateSignUp");
    const fields = Object.keys(formData);
    const errorFields = {};
    // console.log(fields);
    // for(const field in fields)
    fields.forEach((field)=>
    {
        // console.log("Here: "+formData[field]);
        if(formData[field]=="")
        {
            // console.log(field);
            errorFields[field] = "cannot be empty";
            // errorFields.reason = "cannot be empty";
        }
        else if(formData[field].length<3)
        {
            errorFields[field] = "must be of minimum 3 characters";
        }
    });
    // for(let i=0;i<fields.length;i++)
    // {
    //     // console.log(fields[i]);
    //     if(formData[fields[i]]=="")
    //     {
    //         // errorFields.= fields[i];
    //         errorFields.field = fields[i];
    //         errorFields.reason = "cannot be empty";
    //         // errorFields = {field:fields[i]};
    //     }
    //     // if(formData[fields[i]].length<4)
    //     // {   
    //     //     // console.log(formData[fields[i]]+" "+formData[fields[i]].length);
    //     //     errorFields.push(fields[i]+" must be of minimum 4 characters");
    //     // }
    // }
    // if(formData.name.length<4)
    // {   
    //     // console.log(formData[fields[i]]+" "+formData[fields[i]].length);
    //     errorFields.push("name must be of minimum 4 characters");
    // }
    if(formData.password!=formData.cpassword)
        errorFields.cpassword ="Password and confirm Password must be the same!";
    // console.log(errorFields==null);
    // if(errorFields!=null)
    //     return false
    return errorFields;
}