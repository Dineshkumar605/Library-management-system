import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { HiTrash, HiSearch } from "react-icons/hi";

function DelUser() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!email.trim()) { setError("Please enter a user email"); return; }
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch(`http://localhost:8080/LMS/delete-user/${email}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete the user");
      setMessage(`User with email "${email}" was deleted successfully!`);
      setIsError(false);
      setEmail("");
    } catch (err) { setMessage(err.message); setIsError(true); }
    setLoading(false);
  };

  return (
    <div className="card form-card fade-in">
      <div className="page-header">
        <div className="icon" style={{ backgroundColor: "var(--danger-light)", color: "var(--danger)" }}>
          <HiTrash size={22} />
        </div>
        <h1>Delete User</h1>
      </div>

      <p style={{ color: "var(--text-secondary)", marginBottom: "16px" }}>
        Enter the email of the user you want to remove. This action cannot be undone.
      </p>

      <div className="search-input-wrapper mb-3">
        <HiSearch className="search-icon" size={18} />
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && fetchData()} placeholder="Enter user email" style={{ paddingLeft: "40px" }} />
      </div>

      {error && <span className="field-error">{error}</span>}

      <button className="btn btn-danger w-100" onClick={fetchData} disabled={loading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        {loading && <span className="spinner" />}
        {loading ? "Deleting..." : "Delete User"}
      </button>

      {message && (
        <Alert variant={isError ? "danger" : "success"} className="mt-3 mb-0">{message}</Alert>
      )}
    </div>
  );
}

export default DelUser;
