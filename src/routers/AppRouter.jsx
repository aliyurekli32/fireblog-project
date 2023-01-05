import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import About from "../pages/About";
import Dashboard from "../pages/Dashboard";
import Details from "../pages/Details";
import Login from "../pages/Login";
import NewBlog from "../pages/NewBlog";
import Register from "../pages/Register";
import UpdateBlog from "../pages/UpdateBlog";
import PrivateRouter from "./PrivateRouter";


const AppRouter = () => {
  return <>
  <Navbar/>
  <Routes>
    
    <Route path="/" element={<Dashboard/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/newblog" element={<PrivateRouter/>}>
      <Route path="" element={<NewBlog/>}/>
    </Route>
    <Route path="/updateblog:id" element={<PrivateRouter/>}>
      <Route path="" element={<UpdateBlog/>}/>
    </Route>
    <Route path="/details" element={<PrivateRouter/>}>
      <Route path="" element={<Details/>}/>
    </Route>
    
   
  </Routes>
  </>;
};

export default AppRouter;
