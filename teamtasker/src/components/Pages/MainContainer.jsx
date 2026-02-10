import React, { useEffect, useState } from 'react';
import Header from './header/header';
import Footer from './footer/footer';
import LeftPanel from './leftPanel/leftPanel';
import './MainContainer.css';
import DSBody from './body/DashBoard';
import TaskBoard from './body/TaskBoard';
import { setUser } from '../../Store/authSlice';
import { useDispatch } from 'react-redux';
import { getProfileApi } from '../../APi/AuthAPI';
import Profile from './body/Profile';

export const MainContainer = () => {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getProfileApi();
      console.log('profile',profile);
      
      dispatch(setUser({
        username: profile.data.name,
        userId: profile.data._id,
        email : profile.data.email,
        token: localStorage.getItem("token")
      }));
    };

    fetchUserProfile();
  }, []);
  return (
    <div className="home-container">
      <Header />
      <div className="main-content">
        <LeftPanel setActivePage={setActivePage} />

        {activePage === "dashboard" && <DSBody />}
        {activePage === "tasks" && <TaskBoard />}
        {activePage === "profile" && <Profile />}
      </div>
      <Footer />
    </div>
  );
};

export default MainContainer;
