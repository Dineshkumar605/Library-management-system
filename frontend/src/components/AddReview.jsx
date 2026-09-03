import React, { useState } from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";

function AddReview() {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState({ rating: "", comment: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!title || !review.rating || !review.comment) {
      alert("All fields are required");
      return;
    }

    const response = await fetch(`http://localhost:8080/LMS/add-reviews/${title}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });

    const data = await response.json();
    setMessage(data.message);
    setTitle("");
    setReview({ rating: "", comment: "" });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className="p-4 shadow-lg" style={{ width: "100%", maxWidth: "600px", backgroundColor: "rgba(255,255,255,0.95)" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Add Review for a Book</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter book title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rating (1-5)</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                min="1"
                max="5"
                value={review.rating}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="comment"
                placeholder="Write your review..."
                value={review.comment}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>

            {message && <Alert className="mt-3" variant="success">{message}</Alert>}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddReview;
