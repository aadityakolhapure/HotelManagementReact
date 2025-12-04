import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg mb-4"
      style={{
        background: "linear-gradient(90deg, #0056d6, #007bff)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-white" to="/">
          Hotel Management
        </Link>

        <button
          className="navbar-toggler text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white px-3" to="/">
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white px-3" to="/rooms">
                Rooms
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white px-3" to="/customers">
                Customers
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white px-3" to="/bookings">
                Bookings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
