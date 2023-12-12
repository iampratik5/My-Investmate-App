import { useEffect, useState } from "react";
import { userContext } from "./userContext";
import { checkTokenExpiry, getAuthToken, getCurrentUserDetails, isLoggedIn } from "../auth";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../services/user-service";

export function UserProvider({children}) {
    const [user, setUser] = useState({
      userinfo:'',
      tokenexpired:''
    });
    const [login, setLogin] = useState(isLoggedIn());
    const [token,setToken] = useState(getAuthToken());
    const [tokenexpiry, setTokenexpiry] = useState();

    useEffect(() => {
      setLogin({...login})
      setToken({...token})
      setUser({userinfo:getCurrentUserDetails(),tokenexpired:tokenexpiry})
    }, []);

    return(
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    )
}