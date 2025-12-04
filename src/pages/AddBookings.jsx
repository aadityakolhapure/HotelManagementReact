/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import axios from "axios";

export default function AddBookings() {
  const [customers, setCustomers] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    axios
      .get("https://hotelmanagement-5c29.onrender.com/api/Customer")
      .then((res) => setCustomers(res.data));

    axios
      .get("https://hotelmanagement-5c29.onrender.com/api/Room")
      .then((res) => setRooms(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customerId || !roomId || !checkIn || !checkOut) {
      alert("All fields are required");
      return;
    }

    if (checkIn < today) {
      alert("Check-in cannot be a past date");
      return;
    }

    if (checkOut <= checkIn) {
      alert("Check-out must be after check-in");
      return;
    }

    const bookingData = {
      customerId,
      roomId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      status: "Active",
    };

    axios
      .post(
        "https://hotelmanagement-5c29.onrender.com/api/Booking",
        bookingData
      )
      .then(() => {
        alert("Booking created successfully");
        window.location.href = "/bookings";
      })
      .catch(() => alert("Room may already be booked"));
  };

  return (
    <>
      <h1>Add Booking</h1>

      <form className="p-3 border rounded" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Customer</label>
          <select
            className="form-control"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required>
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c.customerId} value={c.customerId}>
                {c.name} ({c.email})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Room</label>
          <select
            className="form-control"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required>
            <option value="">Select Room</option>
            {rooms.map((r) => (
              <option key={r.roomId} value={r.roomId}>
                Room {r.roomNumber} ({r.type})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Check-In Date</label>
          <input
            type="date"
            className="form-control"
            min={today}
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (checkOut && checkOut <= e.target.value) setCheckOut("");
            }}
            required
          />
        </div>

        <div className="mb-3">
          <label>Check-Out Date</label>
          <input
            type="date"
            className="form-control"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary">Create Booking</button>
      </form>
    </>
  );
}
