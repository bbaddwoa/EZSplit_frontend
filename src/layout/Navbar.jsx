import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <header id="navbar">
      <NavLink id="brand" to="/">
        <p>EZSplit</p>
      </NavLink>
      <nav>{/* No login/logout */}</nav>
    </header>
  );
}
