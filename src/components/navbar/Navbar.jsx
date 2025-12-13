import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assests/logo2.png";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/actions/authaction";

const Navbar = ({ notifyMsg }) => {
  const [toggle, setToggle] = useState(false);

  // ✅ Get auth state from Redux
  const { user, accessToken, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
    notifyMsg("success", "Logged Out Successfully!");
  };

  return (
    <div className="signlang_navbar gradient__bg">
      <div className="singlang_navlinks">
        {/* Logo */}
        <div className="signlang_navlinks_logo">
          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="signlang_navlinks_container">
          <p><Link to="/">Home</Link></p>
          <p><Link to="/detect">Detect</Link></p>
          <p><Link to="/resources">Resources</Link></p>

          {accessToken && user && (
            <p><Link to="/dashboard">Dashboard</Link></p>
          )}
        </div>

        {/* Desktop Auth */}
        <div className="signlang_auth-data">
          {loading ? (
            <span className="auth-loading">Loading...</span>
          ) : accessToken && user ? (
            <>
              <img
                src={user.photoURL}
                alt="user"
                className="user-avatar"
                referrerPolicy="no-referrer"
              />
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="signlang__navbar-menu">
        {toggle ? (
          <RiCloseLine color="#fff" size={27} onClick={() => setToggle(false)} />
        ) : (
          <RiMenu3Line color="#fff" size={27} onClick={() => setToggle(true)} />
        )}

        {toggle && (
          <div className="signlang__navbar-menu_container scale-up-center">
            <div className="signlang__navbar-menu_container-links">
              <p><Link to="/" onClick={() => setToggle(false)}>Home</Link></p>
              <p><Link to="/detect" onClick={() => setToggle(false)}>Detect</Link></p>
              <p><Link to="/resources" onClick={() => setToggle(false)}>Resources</Link></p>

              {accessToken && user && (
                <p>
                  <Link to="/dashboard" onClick={() => setToggle(false)}>
                    Dashboard
                  </Link>
                </p>
              )}
            </div>

            <div className="signlang__navbar-menu_container-links-authdata">
              {loading ? (
                <span className="auth-loading">Loading...</span>
              ) : accessToken && user ? (
                <>
                  <img
                    src={user.photoURL}
                    alt="user"
                    className="user-avatar"
                    referrerPolicy="no-referrer"
                  />
                  <button type="button" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <button type="button" onClick={handleLogin}>
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
