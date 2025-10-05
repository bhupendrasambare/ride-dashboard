import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter } from "react-icons/fa";
import api from "../services/api";
import { AUTH_LOGIN, AUTH_REGISTER } from "../services/urls";
import LoginBg from "../assets/login-box.jpg";
import "../assets/css/login.css";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // 🔹 Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(AUTH_LOGIN, {
        username,
        password,
      });
      const { access_token } = response.data;
      localStorage.setItem("token", access_token);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  // 🔹 Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post(AUTH_REGISTER, {
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        role: "Admin",
      });
      toast.success("Registration successful, please log in");
      setShowLogin(true);
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="login-body">
      <section className="login-ftco-section">
        <div className="login-container">
          <div className="login-wrap">
            <div
              className="login-img"
              style={{
                backgroundImage: `url(${LoginBg})`,
              }}
            ></div>

            <div className="login-login-wrap">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-4">{showLogin ? "Sign In" : "Register"}</h3>
                <div className="login-social-media">
                  <a href="#">
                    <FaFacebook />
                  </a>
                  <a href="#">
                    <FaTwitter />
                  </a>
                </div>
              </div>

              {/* Conditional form */}
              {showLogin ? (
                <form onSubmit={handleLogin} className="signin-form">
                  <div className="form-group mb-3">
                    <label className="login-label" htmlFor="username">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="login-form-control"
                      placeholder="Username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="login-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="login-form-control"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <button
                      type="submit"
                      className="login-btn w-100 rounded submit px-3"
                    >
                      Sign In
                    </button>
                  </div>

                  <div className="form-group d-flex justify-content-between">
                    <label className="login-checkbox-wrap">
                      Remember Me
                      <input type="checkbox" defaultChecked />
                      <span className="login-checkmark"></span>
                    </label>
                    <a onClick={()=>setShowLogin(false)}>Forgot Password</a>
                  </div>

                  <p className="login-text-center mt-3">
                    Not a member?{" "}
                    <div onClick={() => setShowLogin(false)}>
                      Sign Up
                    </div>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="signin-form">
                  <div className="form-group mb-3">
                    <label className="login-label">First Name</label>
                    <input
                      type="text"
                      className="login-form-control"
                      placeholder="First Name"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="login-label">Last Name</label>
                    <input
                      type="text"
                      className="login-form-control"
                      placeholder="Last Name"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="login-label">Username</label>
                    <input
                      type="text"
                      className="login-form-control"
                      placeholder="Username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="login-label">Email</label>
                    <input
                      type="email"
                      className="login-form-control"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="login-label">Password</label>
                    <input
                      type="password"
                      className="login-form-control"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <button
                      type="submit"
                      className="login-btn w-100 rounded submit px-3"
                    >
                      Register
                    </button>
                  </div>

                  <p className="login-text-center mt-3">
                    Already a member?{" "}
                    <a
                      href="#"
                      onClick={() => setShowLogin(true)}
                      style={{ color: "#007bff" }}
                    >
                      Sign In
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
