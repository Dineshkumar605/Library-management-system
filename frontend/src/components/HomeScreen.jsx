import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLoadDemo = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("http://localhost:8080/LMS/demo/add", {
        method: "POST",
      });
      const data = await response.json();
      if (response.ok) {
        setMessage({ text: data.message, type: "success" });
      } else {
        setMessage({ text: data.message || "Failed to load demo data", type: "danger" });
      }
    } catch (error) {
      setMessage({ text: "Error connecting to server", type: "danger" });
    }
    setLoading(false);
  };

  const handleClearDemo = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("http://localhost:8080/LMS/demo/clear", {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        setMessage({ text: data.message, type: "success" });
      } else {
        setMessage({ text: data.message || "Failed to clear demo data", type: "danger" });
      }
    } catch (error) {
      setMessage({ text: "Error connecting to server", type: "danger" });
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-dark text-white text-center">
              <h2>📚 Library Management System</h2>
            </div>
            <div className="card-body text-center">
              <p className="lead mb-4">
                Welcome to the Library Management System — a complete platform to manage users, authors, books, and reviews efficiently.
              </p>

              <h4 className="mb-3">Quick Actions</h4>

              <div className="row g-3 justify-content-center">
                <div className="col-md-4">
                  <div className="card h-100 border-secondary">
                    <div className="card-header bg-secondary text-white text-center">👥 Users</div>
                    <div className="card-body d-grid gap-2">
                      <Link to="/allusers" className="btn btn-outline-primary">🗂️ View All Users</Link>
                      <Link to="/fetchusers" className="btn btn-outline-primary">🔍 Fetch User</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 border-info">
                    <div className="card-header bg-info text-white text-center">📚 Books</div>
                    <div className="card-body d-grid gap-2">
                      <Link to="/allbooks" className="btn btn-outline-info">🗂️ View All Books</Link>
                      <Link to="/bookDetails" className="btn btn-outline-info">📖 View Book Reviews</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 border-warning">
                    <div className="card-header bg-warning text-white text-center">⭐ Reviews</div>
                    <div className="card-body d-grid gap-2">
                      <Link to="/allreviews" className="btn btn-outline-warning">🗂️ View All Reviews</Link>
                      <Link to="/addreview" className="btn btn-outline-warning">➕ Add Review</Link>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <h4 className="mb-3">Manage</h4>

              <div className="d-grid gap-3 col-8 mx-auto">
                <Link to="/adduser" className="btn btn-outline-success btn-lg">
                  ➕ Add User & Library Card
                </Link>
                <Link to="/updateName" className="btn btn-outline-secondary btn-lg">
                  ✏️ Update User Name
                </Link>
                <Link to="/deleteBook" className="btn btn-outline-danger btn-lg">
                  ❌ Delete Book & Reviews
                </Link>
                <Link to="/deleteUser" className="btn btn-outline-warning btn-lg">
                  🗑️ Delete User & Library Card
                </Link>
                <Link to="/addauthor" className="btn btn-outline-primary btn-lg">
                  ✍️ Add Author & Books
                </Link>
                <Link to="/addbook" className="btn btn-outline-primary btn-lg">
                  📖 Add Book to Author
                </Link>
              </div>

              <hr className="my-4" />

              <h4 className="mb-3">Demo Data</h4>
              <p className="text-muted mb-3">Load sample data to demonstrate the system, then clear it when done.</p>

              {message && (
                <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
                  {message.text}
                  <button type="button" className="btn-close" onClick={() => setMessage("")}></button>
                </div>
              )}

              <div className="d-flex gap-3 justify-content-center">
                <button
                  className="btn btn-success btn-lg"
                  onClick={handleLoadDemo}
                  disabled={loading}
                >
                  {loading ? "Working..." : "Load Demo Data"}
                </button>
                <button
                  className="btn btn-danger btn-lg"
                  onClick={handleClearDemo}
                  disabled={loading}
                >
                  {loading ? "Working..." : "Clear Demo Data"}
                </button>
              </div>
            </div>
            <div className="card-footer text-muted text-center">
              Made with ❤️ using React & Spring Boot
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
