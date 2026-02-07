import { useState } from "react";
import { regesiterUserApi } from "../../APi/AuthAPI";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import logo from "../../Assets/appLogo.jpg";

export const SignUp = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const registerUser = async () => {

    if (!user.name || !user.email || !user.password || !user.confirmPassword)
      return alert("Please fill all fields");

    if (!isValidEmail(user.email))
      return alert("Invalid email format");

    if (user.password !== user.confirmPassword)
      return alert("Passwords do not match");

    try {

      const response = await regesiterUserApi({
        name: user.name,
        email: user.email,
        password: user.password
      });

      console.log('response',response, response.status);
      

      if (response.status === 201) {
        alert("Registration Successful 🎉");
        navigate("/");
      }

    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="signup-container">

      <div className="signup-card">

        {/* LOGO */}
        <div className="signup-logo">
          <img src={logo} alt="logo" />
        </div>

        <h3>Create Account 🚀</h3>
        <p className="subtitle">Join TeamTasker today</p>

        {/* NAME */}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>

        {/* EMAIL */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        {/* PASSWORD */}
        <div className="form-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="form-group">
          <label>Confirm Password</label>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
            />

            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? "🙈" : "👁"}
            </span>
          </div>
        </div>

        <button className="signup-btn" onClick={registerUser}>
          Sign Up
        </button>

        <p className="login-link">
          Already have account?
          <span onClick={() => navigate("/")}> Login</span>
        </p>

      </div>
    </div>
  );
};
