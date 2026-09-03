import React, { useState } from "react";
import { Card, Button, Container, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function DelUser() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const fetchData = async () => {
    if (!email.trim()) {
      alert("Please enter the user email");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/LMS/delete-user/${email}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the user");
      }

      const result = await response.text();
      setMessage(`✅ User with email "${email}" was deleted successfully!`);
      setEmail("");
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchData();
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "80vh" }}>
      <Card className="p-4 w-100 shadow-lg" style={{ maxWidth: "500px", backgroundColor: "rgba(255,255,255,0.95)" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">🗑️ Delete User by Email</Card.Title>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              value={email}
              onChange={handleEmailChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter user email"
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="danger" onClick={fetchData}>
              Delete User
            </Button>
          </div>

          {message && (
            <Alert className="mt-4" variant={message.includes("Error") ? "danger" : "success"}>
              {message}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DelUser;
