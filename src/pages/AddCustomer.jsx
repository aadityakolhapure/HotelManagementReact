import axios from "axios";
import { useState } from "react";

function AddCustomer() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!Name.trim()) e.Name = "Name is required";
    if (!Email.trim() || !emailPattern.test(Email)) e.Email = "Invalid email";
    if (!Phone.trim() || !phonePattern.test(Phone))
      e.Phone = "Phone must be 10 digits";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    axios
      .post("https://hotelmanagement-5c29.onrender.com/api/Customer", {
        Name,
        Email,
        Phone,
      })
      .then(() => {
        alert("Customer Added Successfully");
        window.location.href = "/customers";
      })
      .catch(() => alert("Error adding customer"));
  };

  return (
    <>
      <h1>Add Customer</h1>

      <form className="p-3 border rounded" onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="text-danger">{errors.Name}</div>
        </div>

        <div className="form-group mb-2">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="text-danger">{errors.Email}</div>
        </div>

        <div className="form-group mb-2">
          <label>Phone</label>
          <input
            type="tel"
            className="form-control"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="text-danger">{errors.Phone}</div>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Add Customer
        </button>
      </form>
    </>
  );
}

export default AddCustomer;
