import { toast } from "react-toastify";
import { myAxios, privateAxios } from "./helper";
import { doLogout, doRefreshToken } from "../auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toasts, reloginInfoToast } from "../components/Toasts";

export const signUpUserApi = (user) => {
    return myAxios.post('/auth/signup', user).then((response) => response.data);
};

export const updateUser = (userId, data) => {
    return privateAxios.put(`/api/v1/users/${userId}`, data)
        .then((response) => { return response.data })
        .catch((error) => {
            if (error?.response?.status == 401) {
                // console.log(localStorage.getItem("data"));
                // toast.error("Token Expired");
                const refreshToken = JSON.parse(localStorage.getItem("data")).refreshToken;
                const refreshTokenData = JSON.parse(`{"refreshToken": "${refreshToken}"}`);
                console.log(JSON.parse(localStorage.getItem("data")).refreshToken);
                doRefreshToken(refreshTokenData, (response) => { updateUser(userId, data) });
                return error.response.status;
            }
            else {
                // console.log(error);
                Toasts("info", "Session Expired, Login again!");
                // const navigate = useNavigate();
                return false;
                // return Logout(true);

            }
        });
};

export const updateUserPassword = (data) => {
    // console.log(data);
    return privateAxios.put(`/api/v1/users/change-password`, data)
        .then((response) => response.data);
        // .catch((error) => error);
};

export const loginUser = (loginDetail) => {
    return myAxios.post('/auth/login', loginDetail)
        .then((response) => response.data);
    // .catch((error)=>console.log(error));
};

export const refreshToken = (refreshToken) => {
    return myAxios.post('/auth/refresh', refreshToken)
        .then((response) => response.data.token)
        .catch((error) => console.log(error));
};

export const isTokenExpired = (token) => {
    return myAxios.post('/auth/token', token).then((response) => response.data);
};
// const navigate = useNavigate();
export const getUserDetails = (userId) => {
    return privateAxios.get(`/api/v1/users/${userId}`)
        .then((response) => { return response.data })
        // .catch((error)=>console.log(error.response.status)); ----do not uncomment
        .catch((error) => {
            // console.log(error);
            if (error?.response?.status == 401) {
                console.log(localStorage.getItem("data"));
                // toast.error("Token Expired");
                const refreshToken = JSON.parse(localStorage.getItem("data")).refreshToken;
                const refreshTokenData = JSON.parse(`{"refreshToken": "${refreshToken}"}`);
                doRefreshToken(refreshTokenData, (response) => { console.log(response) });
                return error.response.status;
            }
            else {
                Toasts("info", "Session Expired, Login again!");
                return false;
                // doLogout(() => {toast.info("Session Expired, Login");navigate('/login')});
            }
        });
};

export const uploadImage = (image, userId) => {
    let formData = new FormData();
    formData.append("image", image);
    return privateAxios.post(`/api/v1/users/${userId}/image/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => response.data);
}

export const getImage = (image) => {
    // console.log("inside getImage " + image);
    return privateAxios.get(`/api/v1/users/image/${image}`,{ responseType: 'blob' }).then((response) => response.data)
        .catch((error) => { console.log(error) });
}

export const signUpUser = (data) => {
    return signUpUserApi(data).then((response) => {
        // console.log(response);
        // console.log("Sucess")
        toast.success(response.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        // setData({
        //     name: '',
        //     email: '',
        //     password: '',
        //     cpassword: ''
        // })
        return response;
    }).catch((error) => {
        // console.log(error);
        // setError({
        //     errors: error,
        //     isError: true
        // })
        return error;
    });
}