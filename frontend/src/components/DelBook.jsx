import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { HiTrash, HiSearch } from "react-icons/hi";

function DelBook() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!title.trim()) { setError("Please enter the book title"); return; }
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch(`http://localhost:8080/LMS/delete-book/${title}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete the book");
      setMessage(`Book titled "${title}" was deleted successfully!`);
      setIsError(false);
      setTitle("");
    } catch (err) { setMessage(err.message); setIsError(true); }
    setLoading(false);
  };

  return (
    <div className="card form-card fade-in">
      <div className="page-header">
        <div className="icon" style={{ backgroundColor: "var(--danger-light)", color: "var(--danger)" }}>
          <HiTrash size={22} />
        </div>
        <h1>Delete Book</h1>
      </div>

      <p style={{ color: "var(--text-secondary)", marginBottom: "16px" }}>
        Enter the title of the book you want to remove. This will also delete all associated reviews.
      </p>

      <div className="search-input-wrapper mb-3">
        <HiSearch className="search-icon" size={18} />
        <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && fetchData()} placeholder="Enter book title" style={{ paddingLeft: "40px" }} />
      </div>

      {error && <span className="field-error">{error}</span>}

      <button className="btn btn-danger w-100" onClick={fetchData} disabled={loading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        {loading && <span className="spinner" />}
        {loading ? "Deleting..." : "Delete Book"}
      </button>

      {message && (
        <Alert variant={isError ? "danger" : "success"} className="mt-3 mb-0">{message}</Alert>
      )}
    </div>
  );
}

export default DelBook;
