import React, { useEffect, useState } from "react";
import "./Profile.css";
import { getProfileApi } from "../../../APi/AuthAPI";
import { useDispatch } from "react-redux";
import { logout } from "../../../Store/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfileApi();
                setUser(response.data);
            } catch (err) {
                console.error("Failed to load profile", err);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token");
        navigate("/");
    };

    if (!user) return <div className="profile-loading">Loading...</div>;

    return (
        <main className="profile-page">
            <h2>Profile</h2>

            <div className="profile-card">

                {/* Avatar */}
                <div className="profile-avatar">
                    {user.name.charAt(0).toUpperCase()}
                </div>

                {/* Name + Role */}
                <h3 className="profile-name">{user.name}</h3>
                <span className="profile-role">User</span>

                <div className="profile-divider" />

                {/* Details */}
                <div className="profile-row">
                    <span>Email</span>
                    <p>{user.email}</p>
                </div>

                <div className="profile-row">
                    <span>Joined</span>
                    <p>{new Date(user.createdAt).toDateString()}</p>
                </div>

                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </main>
    );

};

export default Profile;
