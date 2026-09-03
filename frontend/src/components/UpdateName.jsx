import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { HiPencil } from "react-icons/hi";
import { apiGet, apiPut } from "../api";

function UpdateName() {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    if (!email.trim()) { setErrors({ email: "Email is required" }); return; }
    setLoading(true);
    const { data: result, error } = await apiGet(`/fetch-user-and-issued-library-card/${email}`);
    if (error) { setMessage(error); }
    else { setData(result); setNewName(result.name); setMessage(""); }
    setLoading(false);
  };

  const updateUserName = async () => {
    if (!newName.trim()) { setErrors({ newName: "New name is required" }); return; }
    setLoading(true);
    const { data: result, error } = await apiPut(`/update-name/${email}/${newName}`, newName);
    setMessage(error || result?.message || "Name updated successfully!");
    if (!error) await fetchUserData();
    setLoading(false);
  };

  return (
    <div className="card form-card fade-in">
      <div className="page-header">
        <div className="icon"><HiPencil size={22} /></div>
        <h1>Update User Name</h1>
      </div>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "500" }}>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: "" }); }} style={{ backgroundColor: "var(--bg-body)" }} isInvalid={!!errors.email} />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </Form.Group>

        {data && (
          <div className="fade-in">
            <div style={{ padding: "12px 16px", backgroundColor: "var(--bg-body)", borderRadius: "var(--border-radius)", marginBottom: "16px" }}>
              <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Current Name: </span>
              <span style={{ fontWeight: "600" }}>{data.name}</span>
            </div>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }}>New Name</Form.Label>
              <Form.Control type="text" placeholder="Enter new name" value={newName} onChange={(e) => { setNewName(e.target.value); setErrors({ ...errors, newName: "" }); }} style={{ backgroundColor: "var(--bg-body)" }} isInvalid={!!errors.newName} />
              {errors.newName && <span className="field-error">{errors.newName}</span>}
            </Form.Group>
            <button className="btn btn-success w-100" onClick={updateUserName} disabled={loading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              {loading && <span className="spinner" />}
              {loading ? "Updating..." : "Update Name"}
            </button>
          </div>
        )}

        {!data && (
          <button className="btn btn-primary w-100" onClick={fetchUserData} disabled={loading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            {loading && <span className="spinner" />}
            {loading ? "Fetching..." : "Fetch User"}
          </button>
        )}

        {message && (
          <Alert variant={message.includes("Error") || message.includes("Failed") ? "danger" : "success"} className="mt-3 mb-0">
            {message}
          </Alert>
        )}
      </Form>
    </div>
  );
}

export default UpdateName;
