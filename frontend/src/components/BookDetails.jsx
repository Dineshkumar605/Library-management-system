import React, { useState } from "react";
import { Card, Button, Container, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function BookDetails() {
  const [book, setBook] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const fetchData = async () => {
    if (!title) {
      alert("Enter book title");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/LMS/fetchBookDetailsAndReviews/${title}`
      );
      if (!response.ok) {
        throw new Error("Book not found");
      }

      const json = await response.json();
      setBook(json);
      setError("");
    } catch (error) {
      setBook([]);
      setError(error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchData();
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "80vh" }}>
      <Card className="p-4 w-100 shadow-lg" style={{ maxWidth: "600px", backgroundColor: "rgba(255,255,255,0.95)" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Fetch Book Details and Reviews</Card.Title>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={title}
              onChange={handleTitleChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter book title"
            />
          </Form.Group>
          <div className="d-grid">
            <Button variant="primary" onClick={fetchData}>
              Get Data
            </Button>
          </div>

          {error && <Alert className="mt-3" variant="danger">{error}</Alert>}

          {book.length > 0 && (
            <div className="mt-4">
              <h5>Book Reviews:</h5>
              {book.map((review) => (
                <Card key={review.id} className="mb-3 shadow-sm">
                  <Card.Body>
                    <Card.Text>
                      <strong>Book Title:</strong> {review.booksDTO?.title}
                    </Card.Text>
                    <Card.Text>
                      <strong>Rating:</strong> {review.rating}
                    </Card.Text>
                    <Card.Text>
                      <strong>Comment:</strong> {review.comment}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BookDetails;
