/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    axios
      .get("https://hotelmanagement-5c29.onrender.com/api/Booking")
      .then((res) => setBookings(res.data))
      .catch(() => setBookings([]));
  };

  const deleteBooking = (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    axios
      .delete(`https://hotelmanagement-5c29.onrender.com/api/Booking/${id}`)
      .then(() => loadBookings());
  };

  const getStatusBadge = (status) => {
    if (status === "Active") return "badge bg-success";
    if (status === "Cancelled") return "badge bg-danger";
    return "badge bg-secondary";
  };

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-2 border-bottom">
        <h1 className="h3 fw-bold">Bookings</h1>

        <Link to="/bookings/add" className="btn btn-primary mt-2 mt-md-0 px-4">
          + Add Booking
        </Link>
      </div>

      <div className="table-responsive shadow-sm rounded border bg-white">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-primary">
            <tr>
              <th>Customer</th>
              <th>Room</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.bookingId}>
                <td className="fw-semibold">{b.customer?.name}</td>
                <td>Room {b.room?.roomNumber}</td>
                <td>{b.checkInDate?.split("T")[0]}</td>
                <td>{b.checkOutDate?.split("T")[0]}</td>
                <td>
                  <span className={getStatusBadge(b.status)}>
                    {b.status}
                  </span>
                </td>

                <td className="text-center">
                  <button
                    className="btn btn-outline-danger btn-sm px-3"
                    onClick={() => deleteBooking(b.bookingId)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}

            {bookings.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  No Bookings Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
