import React, { useEffect, useState } from 'react';
import Header from './header/header';
import Footer from './footer/footer';
import LeftPanel from './leftPanel/leftPanel';
import './MainContainer.css';
import DSBody from './body/DashBoard';
import TaskBoard from './body/TaskBoard';
import { setUser , setAllUsers} from '../../Store/authSlice';
import { useDispatch } from 'react-redux';
import { getAllUsersApi, getProfileApi } from '../../APi/AuthAPI';
import Profile from './body/Profile';

export const MainContainer = () => {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState("dashboard");



  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getProfileApi();

      dispatch(setUser({
        username: profile.data.name,
        userId: profile.data._id,
        email: profile.data.email,
        token: localStorage.getItem("token")
      }));
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const getallUsers = async () => {
      const token = localStorage.getItem("token");
      const response = await getAllUsersApi(token);
      console.log('response.data',response.data);
      
      dispatch(setAllUsers(response.data));
    }; getallUsers();
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
