import { NavLink } from "react-router-dom";
import { useAuth } from "../services/auth.jsx";

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <header className="nav nav--compact">
      <div className="nav__inner">
        <NavLink to="/rockets" className="brand" aria-label="SpaceX Viewer Home">
          SpaceX Viewer
        </NavLink>
        <nav className="nav__links">
          <NavLink to="/rockets" className={({ isActive }) => isActive ? "link active" : "link"}>
            Rockets
          </NavLink>

          {user && (
            <NavLink to="/favorites" className={({ isActive }) => isActive ? "link active" : "link"}>
              Favorites
            </NavLink>
          )}

          {!user ? (
            <>
              <NavLink to="/login" className={({ isActive }) => isActive ? "link active" : "link"}>
                Login
              </NavLink>
              <NavLink to="/" className={({ isActive }) => isActive ? "link active" : "link"}>
                Signup
              </NavLink>
            </>
          ) : (
            <button className="link" onClick={logout}>Logout</button>
          )}
        </nav>
      </div>
    </header>
  );
}
