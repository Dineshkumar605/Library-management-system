import React, { useState } from "react";
import { Form, Alert, ListGroup } from "react-bootstrap";
import { HiSearch } from "react-icons/hi";
import { apiGet } from "../api";

function Home() {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    if (!email.trim()) { setError("Please enter an email"); return; }
    setLoading(true);
    setError("");
    const { data: result, error: err } = await apiGet(`/fetch-user-and-issued-library-card/${email}`);
    if (err) { setError(err); setData(null); }
    else { setData(result); setError(""); }
    setLoading(false);
  };

  return (
    <div className="card form-card fade-in">
      <div className="page-header">
        <div className="icon"><HiSearch size={22} /></div>
        <h1>Fetch User by Email</h1>
      </div>

      <div className="search-input-wrapper mb-3">
        <HiSearch className="search-icon" size={18} />
        <Form.Control type="email" placeholder="Enter user email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && fetchUserData()} style={{ paddingLeft: "40px" }} />
      </div>

      <button className="btn btn-primary w-100" onClick={fetchUserData} disabled={loading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        {loading && <span className="spinner" />}
        {loading ? "Fetching..." : "Fetch Data"}
      </button>

      {error && <Alert variant="danger" className="mt-3 mb-0">{error}</Alert>}

      {data && (
        <ListGroup className="mt-3 fade-in">
          <ListGroup.Item style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: "600", color: "var(--text-secondary)" }}>Name</span>
            <span style={{ fontWeight: "500" }}>{data.name}</span>
          </ListGroup.Item>
          <ListGroup.Item style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: "600", color: "var(--text-secondary)" }}>Email</span>
            <span>{data.email}</span>
          </ListGroup.Item>
          <ListGroup.Item style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: "600", color: "var(--text-secondary)" }}>Issue Date</span>
            <span>{data.libraryCardsDTO.issueDate}</span>
          </ListGroup.Item>
          <ListGroup.Item style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: "600", color: "var(--text-secondary)" }}>Expiry Date</span>
            <span>{data.libraryCardsDTO.expiryDate}</span>
          </ListGroup.Item>
        </ListGroup>
      )}
    </div>
  );
}

export default Home;
