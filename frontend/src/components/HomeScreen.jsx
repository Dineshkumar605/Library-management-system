import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function HomeScreen() {
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
