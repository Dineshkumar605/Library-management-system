import React from "react";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi";

function NotFound() {
  return (
    <div className="empty-state" style={{ minHeight: "60vh" }}>
      <div className="not-found-404" style={{ fontSize: "6rem", fontWeight: "700", color: "var(--primary)", opacity: 0.3 }}>404</div>
      <h2 style={{ fontWeight: "600", color: "var(--text-primary)", marginTop: "8px" }}>Page Not Found</h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
        <HiHome size={18} /> Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
