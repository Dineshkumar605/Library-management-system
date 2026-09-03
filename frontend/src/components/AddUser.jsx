import React, { useState } from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AddUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    issueDate: "",
    expiryDate: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.issueDate || !form.expiryDate) {
      alert("All fields are required");
      return;
    }

    const response = await fetch("http://localhost:8080/LMS/add-user-and-issue-library-card", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        libraryCardsDTO: {
          issueDate: form.issueDate,
          expiryDate: form.expiryDate
        }
      })
    });

    const data = await response.json();
    setMessage(data.message);
    setForm({ name: "", email: "", issueDate: "", expiryDate: "" });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className="p-4 shadow-lg w-100" style={{ maxWidth: "600px", backgroundColor: "rgba(255,255,255,0.95)" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Add User & Issue Library Card</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                placeholder="Enter name"
                value={form.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Issue Date</Form.Label>
              <Form.Control
                type="date"
                name="issueDate"
                value={form.issueDate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="success" onClick={handleSubmit}>
                Submit
              </Button>
            </div>

            {message && <Alert variant="info" className="mt-3">{message}</Alert>}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddUser; 
