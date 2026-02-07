import { useState } from "react";
import { loginUserApi } from "../../APi/AuthAPI";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../Assets/appLogo.jpg";

export const Login = () => {

  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const LoginUser = async () => {
    try {

      const response = await loginUserApi({
        email: userEmail,
        password: userPassword
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }

    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        {/* LOGO */}
        <div className="login-logo">
          <img src={logo} alt="App Logo" />
          {/* <h2>TeamTasker</h2> */}
        </div>

        <h3 className="login-title">Welcome Back 👋</h3>
        <p className="login-subtitle">
          Login to your account
        </p>

        {/* EMAIL */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="form-group">
          <label>Password</label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>
        </div>

        <button className="login-btn" onClick={LoginUser}>
          Login
        </button>

        <p className="register-text">
          Don’t have an account?
          <span onClick={() => navigate("/register")}>
            Register
          </span>
        </p>

      </div>
    </div>
  );
};
