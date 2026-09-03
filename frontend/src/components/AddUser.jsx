import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { HiUserGroup } from "react-icons/hi";
import { apiPost } from "../api";

function AddUser() {
  const [form, setForm] = useState({ name: "", email: "", issueDate: "", expiryDate: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email format";
    if (!form.issueDate) errs.issueDate = "Issue date is required";
    if (!form.expiryDate) errs.expiryDate = "Expiry date is required";
    else if (form.issueDate && form.expiryDate <= form.issueDate) errs.expiryDate = "Expiry must be after issue date";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setMessage("");
    const { data, error } = await apiPost("/add-user-and-issue-library-card", {
      name: form.name,
      email: form.email,
      libraryCardsDTO: { issueDate: form.issueDate, expiryDate: form.expiryDate },
    });
    setMessage(error || data?.message || "User created successfully");
    if (!error) setForm({ name: "", email: "", issueDate: "", expiryDate: "" });
    setLoading(false);
  };

  const inputStyle = { backgroundColor: "var(--bg-body)" };

  return (
    <div className="card form-card fade-in">
      <div className="page-header">
        <div className="icon"><HiUserGroup size={22} /></div>
        <h1>Add User</h1>
      </div>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "500" }}>Name</Form.Label>
          <Form.Control name="name" placeholder="Enter full name" value={form.name} onChange={handleChange} style={inputStyle} isInvalid={!!errors.name} />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "500" }}>Email</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email address" value={form.email} onChange={handleChange} style={inputStyle} isInvalid={!!errors.email} />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </Form.Group>

        <div className="row g-3">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }}>Issue Date</Form.Label>
              <Form.Control type="date" name="issueDate" value={form.issueDate} onChange={handleChange} style={inputStyle} isInvalid={!!errors.issueDate} />
              {errors.issueDate && <span className="field-error">{errors.issueDate}</span>}
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }}>Expiry Date</Form.Label>
              <Form.Control type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} style={inputStyle} isInvalid={!!errors.expiryDate} />
              {errors.expiryDate && <span className="field-error">{errors.expiryDate}</span>}
            </Form.Group>
          </div>
        </div>

        <button className="btn btn-primary w-100" onClick={handleSubmit} disabled={loading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          {loading && <span className="spinner" />}
          {loading ? "Creating..." : "Create User"}
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

export default AddUser;
