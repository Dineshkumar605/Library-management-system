import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { HiUserGroup, HiPlus, HiX } from "react-icons/hi";
import { apiPost } from "../api";

function AddAuthor() {
  const [authorName, setAuthorName] = useState("");
  const [bookTitles, setBookTitles] = useState([""]);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTitleChange = (i, value) => {
    const updated = [...bookTitles];
    updated[i] = value;
    setBookTitles(updated);
    setErrors({ ...errors, [`book_${i}`]: "" });
  };

  const addAnotherBook = () => setBookTitles([...bookTitles, ""]);

  const removeBook = (i) => {
    if (bookTitles.length <= 1) return;
    setBookTitles(bookTitles.filter((_, idx) => idx !== i));
  };

  const validate = () => {
    const errs = {};
    if (!authorName.trim()) errs.authorName = "Author name is required";
    bookTitles.forEach((t, i) => {
      if (!t.trim()) errs[`book_${i}`] = `Book title ${i + 1} is required`;
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setMessage("");
    const { data, error } = await apiPost("/add-author-and-books", {
      name: authorName,
      booksDTOS: bookTitles.map((title) => ({ title })),
    });
    setMessage(error || data?.message || "Author added successfully");
    if (!error) { setAuthorName(""); setBookTitles([""]); }
    setLoading(false);
  };

  return (
    <div className="card form-card fade-in">
      <div className="page-header">
        <div className="icon"><HiUserGroup size={22} /></div>
        <h1>Add Author & Books</h1>
      </div>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "500" }}>Author Name</Form.Label>
          <Form.Control type="text" placeholder="Enter author name" value={authorName} onChange={(e) => { setAuthorName(e.target.value); setErrors({ ...errors, authorName: "" }); }} style={{ backgroundColor: "var(--bg-body)" }} isInvalid={!!errors.authorName} />
          {errors.authorName && <span className="field-error">{errors.authorName}</span>}
        </Form.Group>

        <Form.Label style={{ fontWeight: "500" }}>Book Titles</Form.Label>
        {bookTitles.map((title, index) => (
          <div key={index} style={{ display: "flex", gap: "8px", marginBottom: "12px", alignItems: "center" }}>
            <Form.Control type="text" placeholder={`Book title ${index + 1}`} value={title} onChange={(e) => handleTitleChange(index, e.target.value)} style={{ backgroundColor: "var(--bg-body)" }} isInvalid={!!errors[`book_${index}`]} />
            {bookTitles.length > 1 && (
              <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => removeBook(index)} style={{ padding: "6px 10px", flexShrink: 0 }}>
                <HiX size={16} />
              </button>
            )}
          </div>
        ))}
        {Object.keys(errors).filter(k => k.startsWith("book_")).map(k => (
          <span key={k} className="field-error">{errors[k]}</span>
        ))}

        <button type="button" className="btn btn-outline-secondary mb-3" onClick={addAnotherBook} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <HiPlus size={16} /> Add Another Book
        </button>

        <button className="btn btn-primary w-100" onClick={handleSubmit} disabled={loading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          {loading && <span className="spinner" />}
          {loading ? "Submitting..." : "Submit"}
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

export default AddAuthor;
