import React, { useState } from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";

function UpdateName() {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [message, setMessage] = useState("");

  const fetchUserData = () => {
    if (!email) {
      alert("Please enter email");
      return;
    }
    fetch(`http://localhost:8080/LMS/fetch-user-and-issued-library-card/${email}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setNewName(data.name);
      })
      .catch((error) => console.log(error));
  };

  const updateUserName = () => {
    if (!email || !newName) {
      alert("Please enter both email and new name");
      return;
    }
    fetch(`http://localhost:8080/LMS/update-name/${email}/${newName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newName),
    })
      .then((response) => response.json())
      .then((result) => {
        setMessage(result.message || "Name updated successfully!");
        fetchUserData();
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Failed to update name.");
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className="p-4 shadow-lg" style={{ width: "100%", maxWidth: "600px", backgroundColor: "rgba(255,255,255,0.9)" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Update User Name</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            {data && (
              <>
                <p><strong>Current Name:</strong> {data.name}</p>
                <Form.Group className="mb-3">
                  <Form.Label>New Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter new name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </Form.Group>
                <Button variant="success" onClick={updateUserName}>
                  Update Name
                </Button>
              </>
            )}
            {!data && (
              <Button variant="primary" onClick={fetchUserData}>
                Fetch User
              </Button>
            )}
          </Form>

          {message && <Alert variant="info" className="mt-3">{message}</Alert>}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UpdateName;
