import React, { useState } from "react";
import { Container, Card, Button, Alert, Table, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState("");

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/LMS/fetch-all-users"
      );

      if (response.status === 404) {
        setUsers([]);
        setError("No users found");
        return;
      }

      const json = await response.json();
      setUsers(json);
      setFetched(true);
      setError("");
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching data.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "80vh" }}>
      <Card className="p-4 w-100 shadow-lg" style={{ maxWidth: "800px", backgroundColor: "rgba(255,255,255,0.95)" }}>
        <Card.Body>
          <Link to="/" className="btn btn-outline-secondary btn-sm mb-3">&#8592; Back</Link>
          <Card.Title className="text-center mb-4">👥 All Users</Card.Title>

          <div className="d-grid mb-3">
            <Button variant="primary" onClick={fetchAllUsers}>
              Fetch All Users
            </Button>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          {fetched && users.length > 0 && (
            <Table striped bordered hover className="mt-3">
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
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.libraryCardsDTO.id}</td>
                    <td>{user.libraryCardsDTO.issueDate}</td>
                    <td>
                      {user.libraryCardsDTO.expiryDate}{" "}
                      {new Date(user.libraryCardsDTO.expiryDate) < new Date() && (
                        <Badge bg="danger">Expired</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {fetched && users.length === 0 && !error && (
            <Alert variant="info" className="mt-3">
              No users found in the system.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AllUsers;