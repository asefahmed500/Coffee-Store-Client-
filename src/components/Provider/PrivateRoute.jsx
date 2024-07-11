import {  useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from './AuthProvider';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <span className="loading loading-infinity loading-lg"></span>
    }

    if(user){
        return children
    }



    return <Navigate state={{from: location}}   to="/signin" ></Navigate> ;
};

export default PrivateRoute;