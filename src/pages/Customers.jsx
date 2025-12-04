/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    LoadCustomers();
  }, []);

  const LoadCustomers = () => {
    axios
      .get("https://hotelmanagement-5c29.onrender.com/api/Customer")
      .then((res) => setCustomers(res.data))
      .catch(() => setCustomers([]));
  };

  const DeleteCustomer = (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;

    axios
      .delete(`https://hotelmanagement-5c29.onrender.com/api/Customer/${id}`)
      .then(() => {
        alert("Customer Deleted");
        LoadCustomers();
      });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-2 border-bottom">
        <h1 className="h3 fw-bold">Customers</h1>

        <Link to="/customers/add" className="btn btn-primary px-4 mt-2 mt-md-0">
          + Add Customer
        </Link>
      </div>

      <div className="table-responsive shadow-sm rounded border bg-white">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((cust) => (
              <tr key={cust.customerId}>
                <td className="fw-semibold">{cust.name}</td>
                <td>{cust.email}</td>
                <td>{cust.phone}</td>

                <td className="text-center">
                  <Link
                    to={`/customers/edit/${cust.customerId}`}
                    className="btn btn-outline-primary btn-sm me-2 px-3">
                    Edit
                  </Link>

                  <button
                    className="btn btn-outline-danger btn-sm px-3"
                    onClick={() => DeleteCustomer(cust.customerId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {customers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-muted">
                  No Customers Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;
