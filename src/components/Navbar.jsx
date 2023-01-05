import {
  MDBContainer,
  MDBNavbar,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBtnGroup
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../contexts/AuthContext';
import { logout } from '../helpers/firebase';


const Navbar = () => {
  const {user}=useUserAuth()
  const navigate=useNavigate();
  
  
  return (
    <MDBNavbar light bgColor='light'>
      <MDBContainer fluid>
      
      <MDBBtnGroup >
        <MDBDropdown >
          <MDBDropdownToggle size='lg'>Dropdown</MDBDropdownToggle>
          <MDBDropdownMenu >
            <MDBDropdownItem onClick={()=>{navigate("/newblog")}} link>New Blog</MDBDropdownItem>
            <MDBDropdownItem onClick={()=>{navigate("/");logout()}} link>Logout</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBBtnGroup>
      <MDBBtn onClick={()=>navigate("/")}>Home Page:{user?.displayName}</MDBBtn>
        
        
        <MDBBtnGroup size='lg' aria-label='Basic example'>
        
        <MDBBtn onClick={()=>navigate("/login")}>Login</MDBBtn>
        <MDBBtn onClick={()=>navigate("/register")}>Register</MDBBtn>
      </MDBBtnGroup>
        
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
