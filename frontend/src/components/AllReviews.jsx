import React, { useState } from "react";
import { Badge, Alert } from "react-bootstrap";
import { HiStar } from "react-icons/hi";
import { apiGet } from "../api";

function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAllReviews = async () => {
    setLoading(true);
    const { data, error: err } = await apiGet("/fetch-all-reviews");
    if (err) { setError(err); setReviews([]); }
    else { setReviews(data || []); setError(""); }
    setFetched(true);
    setLoading(false);
  };

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

      <button className="btn btn-primary mb-3" onClick={fetchAllReviews} disabled={loading} style={{ display: "flex", alignItems: "center", gap: "8px", width: "fit-content" }}>
        {loading && <span className="spinner" />}
        {loading ? "Fetching..." : "Fetch All Reviews"}
      </button>

      {error && <Alert variant="danger">{error}</Alert>}

      {fetched && reviews.length > 0 && (
        <div style={{ overflowX: "auto" }}>
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
                  <td>{index + 1}</td>
                  <td style={{ fontWeight: "500" }}>{review.booksDTO.title}</td>
                  <td>{renderStars(review.rating)}</td>
                  <td>{review.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {fetched && reviews.length === 0 && !error && (
        <div className="empty-state">
          <div className="icon"><HiStar size={48} /></div>
          <p>No reviews found in the system.</p>
        </div>
      )}
    </div>
  );
}

export default AllReviews;
