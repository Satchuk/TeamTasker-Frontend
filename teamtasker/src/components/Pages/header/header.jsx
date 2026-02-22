import React from 'react';
import './header.css';
import logo from '../../../Assets/appLogo.jpg';
import logoutIcon from '../../../Assets/logout.png';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from '../../../Store/authSlice';

const Header = () => {
  const username = useSelector(state => state.auth.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {

     if (!window.confirm("Are you sure you want to logout?")) return;
    // clear local storage
    localStorage.removeItem("token");

    // clear redux state
    dispatch(logout());

    // redirect login page
    navigate("/");
  };

  return (
    <header className="header">
      <div className='logo'>
        <img src={logo} alt="TeamTasker Logo" className="logo-image" />
        <label htmlFor="logo">Task Manager</label>
      </div>
      <div className='right-menu'>
        <div className="welcome-message">Welcome, {username}</div>
        <img src={logoutIcon} alt="Logout" className="logout-icon" title='logout' onClick={handleLogout}  
 />
      </div>
    </header>
  );
};

export default Header;
