/* eslint-disable react-hooks/immutability */
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    LoadRooms();
  }, []);

  const LoadRooms = () => {
    axios
      .get("https://hotelmanagement-5c29.onrender.com/api/Room")
      .then((res) => setRooms(res.data))
      .catch(() => setRooms([]));
  };

  const getStatusBadge = (status) => {
    if (status === "Available") return "badge bg-success";
    if (status === "Booked") return "badge bg-danger";
    return "badge bg-secondary";
  };

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-2 border-bottom">
        <h1 className="h3 fw-bold">Rooms</h1>

        <Link to="/rooms/add" className="btn btn-primary px-4 mt-2 mt-md-0">
          + Add Room
        </Link>
      </div>

      <div className="table-responsive shadow-sm rounded border bg-white">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-primary">
            <tr>
              <th>Room No</th>
              <th>Type</th>
              <th>Price</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => (
              <tr key={room.roomId}>
                <td className="fw-semibold">{room.roomNumber}</td>
                <td>{room.type}</td>
                <td>₹{room.price}</td>
                <td>
                  <span className={getStatusBadge(room.status)}>
                    {room.status}
                  </span>
                </td>

                <td className="text-center">
                  <Link
                    to={`/rooms/edit/${room.roomId}`}
                    className="btn btn-outline-primary btn-sm px-3"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}

            {rooms.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">
                  No Rooms Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Rooms;
