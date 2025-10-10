import { NavLink } from "react-router-dom";

export default function NavBar() {
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
          <NavLink to="/login" className={({ isActive }) => isActive ? "link active" : "link"}>
            Login
          </NavLink>
          <NavLink to="/" className={({ isActive }) => isActive ? "link active" : "link"}>
            Signup
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
