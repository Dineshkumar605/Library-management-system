import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { HiStar } from "react-icons/hi";
import { apiPost } from "../api";

function AddReview() {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState({ rating: "", comment: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = "Book title is required";
    if (!review.rating) errs.rating = "Rating is required";
    else if (review.rating < 1 || review.rating > 5) errs.rating = "Rating must be 1-5";
    if (!review.comment.trim()) errs.comment = "Comment is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setMessage("");
    const { data, error } = await apiPost(`/add-reviews/${title}`, review);
    setMessage(error || data?.message || "Review added successfully");
    if (!error) { setTitle(""); setReview({ rating: "", comment: "" }); }
    setLoading(false);
  };

  const renderStars = (rating) => {
    const num = parseInt(rating) || 0;
    return (
      <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <HiStar key={i} size={20} style={{ color: i <= num ? "var(--warning)" : "var(--border-color)", cursor: "pointer" }} onClick={() => { setReview({ ...review, rating: i }); setErrors({ ...errors, rating: "" }); }} />
        ))}
      </div>
    );
  };

  return (
    <div className="card form-card fade-in">
      <div className="page-header">
        <div className="icon"><HiStar size={22} /></div>
        <h1>Add Review</h1>
      </div>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "500" }}>Book Title</Form.Label>
          <Form.Control type="text" placeholder="Enter book title" value={title} onChange={(e) => { setTitle(e.target.value); setErrors({ ...errors, title: "" }); }} style={{ backgroundColor: "var(--bg-body)" }} isInvalid={!!errors.title} />
          {errors.title && <span className="field-error">{errors.title}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "500" }}>Rating</Form.Label>
          <Form.Control type="number" name="rating" min="1" max="5" value={review.rating} onChange={handleChange} style={{ backgroundColor: "var(--bg-body)" }} isInvalid={!!errors.rating} placeholder="1-5" />
          {errors.rating && <span className="field-error">{errors.rating}</span>}
          {renderStars(review.rating)}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "500" }}>Comment</Form.Label>
          <Form.Control as="textarea" rows={3} name="comment" placeholder="Write your review..." value={review.comment} onChange={handleChange} style={{ backgroundColor: "var(--bg-body)" }} isInvalid={!!errors.comment} />
          {errors.comment && <span className="field-error">{errors.comment}</span>}
        </Form.Group>

        <button className="btn btn-primary w-100" onClick={handleSubmit} disabled={loading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          {loading && <span className="spinner" />}
          {loading ? "Submitting..." : "Submit Review"}
        </button>

        {message && (
          <Alert variant={message.includes("Error") || message.includes("error") ? "danger" : "success"} className="mt-3 mb-0">
            {message}
          </Alert>
        )}
      </Form>
    </div>
  );
}

export default AddReview;
