import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container px-5">
        <a className="navbar-brand" href="/">
          Crypto Currency Viewer
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {user && (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  onClick={() => handleNavigation("/dashboard")}
                  style={{ cursor: "pointer" }}
                >
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => handleNavigation("/contactus")}
                  style={{ cursor: "pointer" }}
                >
                  Contact Us
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  Log Out
                </a>
              </li>
            </ul>
          )}
          {!user && (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => handleNavigation("/login")}
                  style={{ cursor: "pointer" }}
                >
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => handleNavigation("/signup")}
                  style={{ cursor: "pointer" }}
                >
                  Sign Up
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
