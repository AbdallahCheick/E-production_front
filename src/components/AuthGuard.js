import { Navigate } from "react-router-dom";
import { accountService } from "./accountService";
const AuthGuard = ({children}) => {
    if(!accountService.isLogged()) {
        return <Navigate to="/login"/>
    }
  return children
}

export default AuthGuard
