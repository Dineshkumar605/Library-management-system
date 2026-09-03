import React, { useState } from "react";
import { Form, Alert, Card } from "react-bootstrap";
import { HiSearch, HiStar } from "react-icons/hi";

function BookDetails() {
  const [book, setBook] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!title.trim()) { setError("Please enter a book title"); return; }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`http://localhost:8080/LMS/fetchBookDetailsAndReviews/${title}`);
      if (!response.ok) throw new Error("Book not found");
      const json = await response.json();
      setBook(json);
    } catch (err) { setBook([]); setError(err.message); }
    setLoading(false);
  };

  const renderStars = (rating) => (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <HiStar key={i} size={16} style={{ color: i <= rating ? "var(--warning)" : "var(--border-color)" }} />
      ))}
    </div>
  );

  return (
    <div className="card form-card fade-in" style={{ maxWidth: "700px" }}>
      <div className="page-header">
        <div className="icon"><HiSearch size={22} /></div>
        <h1>Book Details & Reviews</h1>
      </div>

      <div className="search-input-wrapper mb-3">
        <HiSearch className="search-icon" size={18} />
        <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && fetchData()} placeholder="Enter book title" style={{ paddingLeft: "40px" }} />
      </div>

      <button className="btn btn-primary w-100" onClick={fetchData} disabled={loading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        {loading && <span className="spinner" />}
        {loading ? "Searching..." : "Search Reviews"}
      </button>

      {error && <Alert variant="danger" className="mt-3 mb-0">{error}</Alert>}

      {book.length > 0 && (
        <div className="mt-4 fade-in">
          <h5 style={{ fontWeight: "600", marginBottom: "12px" }}>Reviews ({book.length})</h5>
          {book.map((review) => (
            <Card key={review.id} className="mb-3 card-hover">
              <Card.Body>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div>
                    <div style={{ fontWeight: "600", color: "var(--text-primary)" }}>{review.booksDTO?.title}</div>
                    <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "4px" }}>{review.comment}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "16px" }}>
                    {renderStars(review.rating)}
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookDetails;
