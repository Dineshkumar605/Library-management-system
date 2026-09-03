import React, { useState, useEffect } from "react";
import { Badge, Alert } from "react-bootstrap";
import { HiUsers } from "react-icons/hi";
import { apiGet } from "../api";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      const { data, error: err } = await apiGet("/fetch-all-users");
      if (err) { setError(err); setUsers([]); }
      else { setUsers(data || []); setError(""); }
      setLoading(false);
    };
    fetchAllUsers();
  }, []);

  return (
    <div className="card data-card fade-in">
      <div className="page-header">
        <div className="icon"><HiUsers size={22} /></div>
        <h1>All Users</h1>
      </div>

      {loading && (
        <div className="empty-state">
          <span className="spinner spinner-dark" />
          <p>Loading users...</p>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && users.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Card ID</th>
                <th>Issue Date</th>
                <th>Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.email}>
                  <td>{index + 1}</td>
                  <td style={{ fontWeight: "500" }}>{user.name}</td>
                  <td>{user.email}</td>
                  <td><code style={{ fontSize: "0.8125rem" }}>{user.libraryCardsDTO.id}</code></td>
                  <td>{user.libraryCardsDTO.issueDate}</td>
                  <td>
                    {user.libraryCardsDTO.expiryDate}{" "}
                    {new Date(user.libraryCardsDTO.expiryDate) < new Date() && (
                      <Badge bg="danger" style={{ marginLeft: "4px" }}>Expired</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && users.length === 0 && !error && (
        <div className="empty-state">
          <div className="icon"><HiUsers size={48} /></div>
          <p>No users found in the system.</p>
        </div>
      )}
    </div>
  );
}

export default AllUsers;
