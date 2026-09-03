import React, { useState } from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function AddBook() {
  const [authorName, setAuthorName] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!authorName || !title.trim()) {
      alert("Author name and book title are required");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/LMS/add-book/${encodeURIComponent(authorName)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        setMessage("");
        return;
      }

      setMessage(data.message);
      setError("");
      setAuthorName("");
      setTitle("");
    } catch (err) {
      console.error(err);
      setError("An error occurred while adding the book.");
      setMessage("");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className="p-4 shadow-lg" style={{ width: "100%", maxWidth: "600px", backgroundColor: "rgba(255,255,255,0.95)" }}>
        <Card.Body>
          <Link to="/" className="btn btn-outline-secondary btn-sm mb-3">&#8592; Back</Link>
          <Card.Title className="text-center mb-4">Add Book to Author</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter existing author name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter book title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-center mt-3">
              <Button variant="primary" onClick={handleSubmit}>
                Add Book
              </Button>
            </div>

            {message && <Alert variant="success" className="mt-4">{message}</Alert>}
            {error && <Alert variant="danger" className="mt-4">{error}</Alert>}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddBook;
