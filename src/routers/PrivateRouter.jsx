import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../contexts/AuthContext";


const PrivateRouter = () => {
  const {user}=useUserAuth();
  return (<>
  {user ? <Outlet/> : <Navigate to="/login"/> }
  </>)
};

export default PrivateRouter;
