import {useContext, useDebugValue} from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, auth => auth?.user?.id ? "LoggedIn" : "LoggedOut")
  return useContext(AuthContext);
}

export default useAuth;