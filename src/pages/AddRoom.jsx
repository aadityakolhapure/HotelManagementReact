import axios from "axios";
import { useState } from "react";

function AddRoom() {
  const [roomNumber, setRoomNumber] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!roomNumber.trim() || isNaN(roomNumber) || Number(roomNumber) <= 0)
      e.roomNumber = "Enter a valid room number";

    if (!type.trim()) e.type = "Room type required";

    if (!price || isNaN(price) || Number(price) <= 0)
      e.price = "Enter a valid positive price";

    if (!status.trim()) e.status = "Status required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    axios
      .post("https://hotelmanagement-5c29.onrender.com/api/Room", {
        RoomNumber: roomNumber,
        Type: type,
        Price: Number(price),
        Status: status,
      })
      .then(() => {
        alert("Room Added Successfully");
        window.location.href = "/rooms";
      })
      .catch(() => alert("Error adding room"));
  };

  return (
    <>
      <h1>Add Room</h1>

      <form className="p-3 border rounded" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Room Number</label>
          <input
            type="number"
            className="form-control"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
          <div className="text-danger">{errors.roomNumber}</div>
        </div>

        <div className="form-group mb-3">
          <label>Room Type</label>
          <input
            type="text"
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <div className="text-danger">{errors.type}</div>
        </div>

        <div className="form-group mb-3">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="text-danger">{errors.price}</div>
        </div>

        <div className="form-group mb-3">
          <label>Status</label>
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}>
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            {/* <option value="Maintenance">Maintenance</option> */}
          </select>
          <div className="text-danger">{errors.status}</div>
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Add Room
        </button>
      </form>
    </>
  );
}

export default AddRoom;
