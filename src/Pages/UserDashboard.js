import { NavLink, Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../auth";
import Base from "../components/Base";
import { Toasts } from "../components/Toasts";
import { useEffect } from "react";

export const UserDashboard = () => {
    return (
        <Base>
            <div>
                <h1>User Dashboard</h1>
            </div>
        </Base>
    );
}