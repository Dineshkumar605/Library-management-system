import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../api";
import {
  HiUsers,
  HiBookOpen,
  HiStar,
  HiPlus,
  HiTrash,
  HiPencil,
  HiSearch,
  HiRefresh,
} from "react-icons/hi";

function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [stats, setStats] = useState({ users: 0, books: 0, reviews: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, booksRes, reviewsRes] = await Promise.allSettled([
          fetch(`${API_BASE}/fetch-all-users`),
          fetch(`${API_BASE}/fetch-all-books`),
          fetch(`${API_BASE}/fetch-all-reviews`),
        ]);
        if (usersRes.status === "fulfilled" && usersRes.value.ok) {
          const d = await usersRes.value.json();
          setStats((s) => ({ ...s, users: d.length }));
        }
        if (booksRes.status === "fulfilled" && booksRes.value.ok) {
          const d = await booksRes.value.json();
          setStats((s) => ({ ...s, books: d.length }));
        }
        if (reviewsRes.status === "fulfilled" && reviewsRes.value.ok) {
          const d = await reviewsRes.value.json();
          setStats((s) => ({ ...s, reviews: d.length }));
        }
      } catch { }
    };
    fetchStats();
  }, []);

  const handleLoadDemo = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_BASE}/demo/add`, { method: "POST" });
      const data = await response.json();
      setMessage({ text: data.message, type: response.ok ? "success" : "danger" });
      if (response.ok) {
        const [usersRes, booksRes, reviewsRes] = await Promise.allSettled([
          fetch(`${API_BASE}/fetch-all-users`),
          fetch(`${API_BASE}/fetch-all-books`),
          fetch(`${API_BASE}/fetch-all-reviews`),
        ]);
        if (usersRes.status === "fulfilled" && usersRes.value.ok) {
          const d = await usersRes.value.json();
          setStats((s) => ({ ...s, users: d.length }));
        }
        if (booksRes.status === "fulfilled" && booksRes.value.ok) {
          const d = await booksRes.value.json();
          setStats((s) => ({ ...s, books: d.length }));
        }
        if (reviewsRes.status === "fulfilled" && reviewsRes.value.ok) {
          const d = await reviewsRes.value.json();
          setStats((s) => ({ ...s, reviews: d.length }));
        }
      }
    } catch {
      setMessage({ text: "Error connecting to server", type: "danger" });
    }
    setLoading(false);
  };

  const handleClearDemo = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_BASE}/demo/clear`, { method: "DELETE" });
      const data = await response.json();
      setMessage({ text: data.message, type: response.ok ? "success" : "danger" });
      if (response.ok) setStats({ users: 0, books: 0, reviews: 0 });
    } catch {
      setMessage({ text: "Error connecting to server", type: "danger" });
    }
    setLoading(false);
  };

  const statCards = [
    { label: "Total Users", value: stats.users, icon: <HiUsers size={24} />, color: "var(--primary)", bg: "var(--primary-light)" },
    { label: "Total Books", value: stats.books, icon: <HiBookOpen size={24} />, color: "var(--info)", bg: "var(--info-light)" },
    { label: "Total Reviews", value: stats.reviews, icon: <HiStar size={24} />, color: "var(--warning)", bg: "var(--warning-light)" },
  ];

  const actions = [
    { to: "/adduser", icon: <HiPlus size={20} />, label: "Add User", desc: "Create a new user with library card", color: "var(--success)" },
    { to: "/allusers", icon: <HiUsers size={20} />, label: "All Users", desc: "View and manage all registered users", color: "var(--primary)" },
    { to: "/addauthor", icon: <HiPlus size={20} />, label: "Add Author", desc: "Add a new author with books", color: "var(--accent)" },
    { to: "/allbooks", icon: <HiBookOpen size={20} />, label: "All Books", desc: "Browse the complete book catalog", color: "var(--info)" },
    { to: "/addreview", icon: <HiStar size={20} />, label: "Add Review", desc: "Write a review for a book", color: "var(--warning)" },
    { to: "/allreviews", icon: <HiStar size={20} />, label: "All Reviews", desc: "See all book reviews", color: "#f97316" },
    { to: "/fetchusers", icon: <HiSearch size={20} />, label: "Fetch User", desc: "Look up a user by email", color: "var(--text-secondary)" },
    { to: "/updateName", icon: <HiPencil size={20} />, label: "Update Name", desc: "Change a user's name", color: "var(--primary-dark)" },
    { to: "/deleteUser", icon: <HiTrash size={20} />, label: "Delete User", desc: "Remove a user and their card", color: "var(--danger)" },
    { to: "/deleteBook", icon: <HiTrash size={20} />, label: "Delete Book", desc: "Remove a book from the catalog", color: "var(--danger)" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="icon"><HiBookOpen size={22} /></div>
        <div>
          <h1>Library Management System</h1>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            Manage users, books, authors, and reviews
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="stat-grid mb-4">
        {statCards.map((stat) => (
          <div key={stat.label}>
            <div
              className="card card-hover"
              style={{ padding: "20px", display: "flex", alignItems: "center", gap: "16px" }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "var(--border-radius)",
                  backgroundColor: stat.bg,
                  color: stat.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {stat.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "var(--text-primary)", lineHeight: 1.2 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                  {stat.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card mb-4" style={{ padding: "24px" }}>
        <h3 style={{ margin: "0 0 16px", fontSize: "1.125rem", fontWeight: "600" }}>
          Quick Actions
        </h3>
        <div className="row g-3 quick-actions-grid">
          {actions.map((action) => (
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={action.to}>
              <Link
                to={action.to}
                className="card card-hover"
                style={{
                  display: "block",
                  padding: "16px",
                  textDecoration: "none",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "var(--border-radius)",
                    backgroundColor: action.color + "18",
                    color: action.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                  }}
                >
                  {action.icon}
                </div>
                <div style={{ fontWeight: "600", color: "var(--text-primary)", marginBottom: "4px" }}>
                  {action.label}
                </div>
                <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                  {action.desc}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Data */}
      <div className="card" style={{ padding: "24px" }}>
        <h3 style={{ margin: "0 0 8px", fontSize: "1.125rem", fontWeight: "600" }}>
          Demo Data
        </h3>
        <p style={{ margin: "0 0 16px", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
          Load sample data to see the system in action, then clear it when done.
        </p>

        {message && (
          <div
            className={message.type === "success" ? "message-success" : "message-error"}
            style={{ marginBottom: "16px" }}
          >
            {message.text}
          </div>
        )}

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            className="btn btn-success"
            onClick={handleLoadDemo}
            disabled={loading}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            {loading ? <span className="spinner" /> : <HiRefresh size={16} />}
            {loading ? "Loading..." : "Load Demo Data"}
          </button>
          <button
            className="btn btn-danger"
            onClick={handleClearDemo}
            disabled={loading}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            {loading ? <span className="spinner" /> : <HiTrash size={16} />}
            {loading ? "Clearing..." : "Clear Demo Data"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
