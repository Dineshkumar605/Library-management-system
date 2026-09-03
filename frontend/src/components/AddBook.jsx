import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { HiBookOpen } from "react-icons/hi";

function AddBook() {
  const [authorName, setAuthorName] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!authorName.trim()) errs.authorName = "Author name is required";
    if (!title.trim()) errs.title = "Book title is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`http://localhost:8080/LMS/add-book/${encodeURIComponent(authorName)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const data = await response.json();
      if (!response.ok) { setMessage(data.message); setIsError(true); }
      else { setMessage(data.message); setIsError(false); setAuthorName(""); setTitle(""); }
    } catch { setMessage("An error occurred"); setIsError(true); }
    setLoading(false);
  };

  return (
    <div className="card form-card fade-in">
      <div className="page-header">
        <div className="icon"><HiBookOpen size={22} /></div>
        <h1>Add Book to Author</h1>
      </div>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "500" }}>Author Name</Form.Label>
          <Form.Control type="text" placeholder="Enter existing author name" value={authorName} onChange={(e) => { setAuthorName(e.target.value); setErrors({ ...errors, authorName: "" }); }} style={{ backgroundColor: "var(--bg-body)" }} isInvalid={!!errors.authorName} />
          {errors.authorName && <span className="field-error">{errors.authorName}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "500" }}>Book Title</Form.Label>
          <Form.Control type="text" placeholder="Enter book title" value={title} onChange={(e) => { setTitle(e.target.value); setErrors({ ...errors, title: "" }); }} style={{ backgroundColor: "var(--bg-body)" }} isInvalid={!!errors.title} />
          {errors.title && <span className="field-error">{errors.title}</span>}
        </Form.Group>

        <button className="btn btn-primary w-100" onClick={handleSubmit} disabled={loading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          {loading && <span className="spinner" />}
          {loading ? "Adding..." : "Add Book"}
        </button>

        {message && (
          <Alert variant={isError ? "danger" : "success"} className="mt-3 mb-0">{message}</Alert>
        )}
      </Form>
    </div>
  );
}

export default AddBook;
