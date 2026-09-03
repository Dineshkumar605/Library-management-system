import React, { useState } from "react";
import { Container, Card, Button, Alert, Table, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState("");

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "text-warning" : "text-secondary"}>
          ★
        </span>
      );
    }
    return stars;
  };

  const fetchAllReviews = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/LMS/fetch-all-reviews"
      );

      if (response.status === 404) {
        setReviews([]);
        setError("No reviews found");
        return;
      }

      const json = await response.json();
      setReviews(json);
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
          <Card.Title className="text-center mb-4">⭐ All Reviews</Card.Title>

          <div className="d-grid mb-3">
            <Button variant="primary" onClick={fetchAllReviews}>
              Fetch All Reviews
            </Button>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          {fetched && reviews.length > 0 && (
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Book</th>
                  <th>Rating</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review, index) => (
                  <tr key={review.id}>
                    <td>{index + 1}</td>
                    <td>{review.booksDTO.title}</td>
                    <td>
                      {renderStars(review.rating)}{" "}
                      <Badge bg="secondary">{review.rating}/5</Badge>
                    </td>
                    <td>{review.comment}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {fetched && reviews.length === 0 && !error && (
            <Alert variant="info" className="mt-3">
              No reviews found in the system.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AllReviews;