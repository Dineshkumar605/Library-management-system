import React, { useState, useEffect } from "react";
import { Badge, Alert } from "react-bootstrap";
import { HiStar } from "react-icons/hi";
import { apiGet } from "../api";

function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllReviews = async () => {
      setLoading(true);
      const { data, error: err } = await apiGet("/fetch-all-reviews");
      if (err) { setError(err); setReviews([]); }
      else { setReviews(data || []); setError(""); }
      setLoading(false);
    };
    fetchAllReviews();
  }, []);

  const renderStars = (rating) => {
    return (
      <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <HiStar key={i} size={16} style={{ color: i <= rating ? "var(--warning)" : "var(--border-color)" }} />
        ))}
        <Badge bg="secondary" style={{ marginLeft: "8px" }}>{rating}/5</Badge>
      </div>
    );
  };

  return (
    <div className="card data-card fade-in">
      <div className="page-header">
        <div className="icon"><HiStar size={22} /></div>
        <h1>All Reviews</h1>
      </div>

      {loading && (
        <div className="empty-state">
          <span className="spinner spinner-dark" />
          <p>Loading reviews...</p>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && reviews.length > 0 && (
        <div className="table-responsive-wrapper table-mobile-cards">
          <table className="table table-striped table-hover">
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
                  <td data-label="#">{index + 1}</td>
                  <td data-label="Book" style={{ fontWeight: "500", wordBreak: "break-word" }}>{review.booksDTO.title}</td>
                  <td data-label="Rating">{renderStars(review.rating)}</td>
                  <td data-label="Comment" style={{ wordBreak: "break-word" }}>{review.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && reviews.length === 0 && !error && (
        <div className="empty-state">
          <div className="icon"><HiStar size={48} /></div>
          <p>No reviews found in the system.</p>
        </div>
      )}
    </div>
  );
}

export default AllReviews;
