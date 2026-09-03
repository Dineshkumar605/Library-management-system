import React, { useState } from "react";
import { Container, Card, Form, Button, Alert, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const fetchUserData = async () => {
    if (!email.trim()) {
      alert("Please enter email");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/LMS/fetch-user-and-issued-library-card/${email}`
      );

      if (response.status === 404) {
        setData(null);
        setError("User not found");
        return;
      }

      const json = await response.json();
      setData(json);
      setError("");
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching data.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchUserData();
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "80vh" }}>
      <Card className="p-4 w-100 shadow-lg" style={{ maxWidth: "500px", backgroundColor: "rgba(255,255,255,0.95)" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">📧 Fetch User by Email</Card.Title>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              onKeyDown={handleKeyDown}
            />
          </Form.Group>

          <div className="d-grid mb-3">
            <Button variant="primary" onClick={fetchUserData}>
              Fetch Data
            </Button>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          {data && (
            <ListGroup className="mt-3">
              <ListGroup.Item><strong>Name:</strong> {data.name}</ListGroup.Item>
              <ListGroup.Item><strong>Email:</strong> {data.email}</ListGroup.Item>
              <ListGroup.Item><strong>Issue Date:</strong> {data.libraryCardsDTO.issueDate}</ListGroup.Item>
              <ListGroup.Item><strong>Expiry Date:</strong> {data.libraryCardsDTO.expiryDate}</ListGroup.Item>
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Home;
