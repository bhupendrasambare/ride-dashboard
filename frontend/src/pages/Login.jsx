import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import LoginBg from "../assets/login-box.jpg";
import "../assets/css/login.css";
import { loginUser, registerUser } from "../services/api";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });

  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.access_token);
      setAlert({ type: "success", message: "Login successful!" });
      navigate("/dashboard");
    } catch (err) {
      setAlert({
        type: "danger",
        message: err.detail || "Invalid login credentials",
      });
    }
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password, fullName || username);
      setAlert({
        type: "success",
        message: "Registration successful! Please log in.",
      });
      setShowLogin(true);
    } catch (err) {
      let message = "Registration failed";
      if (err.detail) {
        if (Array.isArray(err.detail)) message = err.detail[0].msg;
        else message = err.detail;
      }
      setAlert({ type: "danger", message });
    }
  };

  return (
    <div className="login-body">
      <div className="login-fullpage d-flex align-items-center justify-content-center">
        <div className="login-wrap shadow-lg rounded overflow-hidden">
          {/* Left Image */}
          <div
            className="login-img"
            style={{ backgroundImage: `url(${LoginBg})` }}
          >
            <div className="login-img-overlay text-white text-center d-flex flex-column justify-content-center">
              <h2 className="fw-bold display-6">Welcome Back!</h2>
              <p className="lead">Access your data insights dashboard</p>
            </div>
          </div>

          {/* Right Form */}
          <div className="login-login-wrap p-5">
            <h3 className="mb-4 text-center">{showLogin ? "Sign In" : "Register"}</h3>

            {/* Social icons */}
            <div className="d-flex justify-content-center mb-4 login-social-media">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
            </div>

            {/* Bootstrap Alert */}
            {alert.message && (
              <div
                className={`alert alert-${alert.type} alert-dismissible fade show`}
                role="alert"
              >
                {alert.message}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  onClick={() => setAlert({ type: "", message: "" })}
                ></button>
              </div>
            )}

            {/* Login Form */}
            {showLogin ? (
              <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    placeholder="Email"
                    className="login-form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    className="login-form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="login-btn w-100 mb-3">
                  Sign In
                </button>
                <p className="text-center">
                  Not a member?{" "}
                  <span
                    onClick={() => setShowLogin(false)}
                    className="login-a cursor-pointer"
                  >
                    Register
                  </span>
                </p>
              </form>
            ) : (
              /* Register Form */
              <form onSubmit={handleRegister}>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="login-form-control"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    placeholder="Email"
                    className="login-form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    className="login-form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="login-btn w-100 mb-3">
                  Register
                </button>
                <p className="text-center">
                  Already a member?{" "}
                  <span
                    onClick={() => setShowLogin(true)}
                    className="login-a cursor-pointer"
                  >
                    Sign In
                  </span>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
