import React, { useState } from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";

function AddAuthor() {
  const [authorName, setAuthorName] = useState("");
  const [bookTitles, setBookTitles] = useState([""]);
  const [message, setMessage] = useState("");

  const handleTitleChange = (i, value) => {
    const updated = [...bookTitles];
    updated[i] = value;
    setBookTitles(updated);
  };

  const addAnotherBook = () => {
    setBookTitles([...bookTitles, ""]);
  };

  const handleSubmit = async () => {
    if (!authorName || bookTitles.some((t) => t.trim() === "")) {
      alert("Author name and all book titles are required");
      return;
    }

    const response = await fetch("http://localhost:8080/LMS/add-author-and-books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: authorName,
        booksDTOS: bookTitles.map((title) => ({ title })),
      }),
    });

    const data = await response.json();
    setMessage(data.message);
    setAuthorName("");
    setBookTitles([""]);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className="p-4 shadow-lg" style={{ width: "100%", maxWidth: "600px", backgroundColor: "rgba(255,255,255,0.95)" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Add Author and Books</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </Form.Group>

            {bookTitles.map((title, index) => (
              <Form.Group className="mb-2" key={index}>
                <Form.Label>{`Book Title ${index + 1}`}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Enter book title ${index + 1}`}
                  value={title}
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                />
              </Form.Group>
            ))}

            <div className="d-flex justify-content-between mt-3">
              <Button variant="secondary" onClick={addAnotherBook}>
                + Add Another Book
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </div>

            {message && <Alert variant="info" className="mt-4">{message}</Alert>}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddAuthor;
