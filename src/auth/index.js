import { useState } from "react";
import { isTokenExpired, refreshToken } from "../services/user-service";

export const isLoggedIn=()=>{
    let data = localStorage.getItem("data");
    // let data = null;
    if(data != null) 
        return true;
    else 
        return false;
}

export const doLogin=(data,next)=>{
    // console.log(data);
    localStorage.setItem("data",JSON.stringify(data));
    next()
};

export const doUserUpdate=(data,next)=>{
    // console.log(data);
    const localData = JSON.parse(localStorage.getItem("data"))
    localData.userDetails = data;
    // console.log(localData);
    localStorage.setItem("data",JSON.stringify(localData));
    next()
}

export const doLogout=(next)=>{
    localStorage.removeItem("data");
    localStorage.removeItem("image");
    next()
}

export const getCurrentUserDetails=()=>{
    if(isLoggedIn())
    {
        // console.log(isLoggedIn());
        // console.log(JSON.parse(localStorage.getItem("data")).userDetails);
        return JSON.parse(localStorage.getItem("data")).userDetails;
    }
    else
        return undefined;
}

export const getAuthToken=()=>{
    if(isLoggedIn())
        return JSON.parse(localStorage.getItem("data")).token;
    else
        return null;
}

export const getRefreshToken=()=>{
    if(isLoggedIn())
        return JSON.parse(localStorage.getItem("data")).refreshToken;
    else
        return null;
}

// console.log(token.size);
export const checkTokenExpiry=(token)=>{
    // console.log("In checkTokenExpiry for "+token);
    let resp = isTokenExpired(token)
        .then(response=>{
            return response;
        }).catch((error)=>{(
            console.log(error))
            return null;
    });
    const getTokenExpiry = async () => {
        const expiry = await resp;
        return expiry;
    }
}

export const saveRefreshToken=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data));
    next()
}

export const doRefreshToken=(refreshTokenData,next)=>{
    // localStorage.setItem("data",JSON.stringify(data));
    // const refreshToken = JSON.parse(localStorage.getItem("data")).refreshtoken;
    refreshToken(refreshTokenData).then((response) => {
        const localData = JSON.parse(localStorage.getItem("data"))
        localData.token = response;
        // localStorage.setItem("data",JSON.stringify(localData));
        saveRefreshToken(localData,(data)=>{console.log(data)})
        // console.log(localData);
        // console.log(response);
        next()
    })
    .catch((error) => {
        console.log(error);
    });
    next()
}


