import { NavLink, Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../auth";

export const PrivateRoute=()=>{
    // let isLoggedIn = isLoggedIn();
    return isLoggedIn() ? <Outlet/> : <Navigate to='/login'/> 
}