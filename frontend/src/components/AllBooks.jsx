import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { HiBookOpen } from "react-icons/hi";
import { apiGet } from "../api";

function AllBooks() {
  const [books, setBooks] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAllBooks = async () => {
    setLoading(true);
    const { data, error: err } = await apiGet("/fetch-all-books");
    if (err) { setError(err); setBooks([]); }
    else { setBooks(data || []); setError(""); }
    setFetched(true);
    setLoading(false);
  };

  return (
    <div className="card data-card fade-in">
      <div className="page-header">
        <div className="icon"><HiBookOpen size={22} /></div>
        <h1>All Books</h1>
      </div>

      <button className="btn btn-primary mb-3" onClick={fetchAllBooks} disabled={loading} style={{ display: "flex", alignItems: "center", gap: "8px", width: "fit-content" }}>
        {loading && <span className="spinner" />}
        {loading ? "Fetching..." : "Fetch All Books"}
      </button>

      {error && <Alert variant="danger">{error}</Alert>}

      {fetched && books.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book.id}>
                  <td>{index + 1}</td>
                  <td style={{ fontWeight: "500" }}>{book.title}</td>
                  <td>{book.authorName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {fetched && books.length === 0 && !error && (
        <div className="empty-state">
          <div className="icon"><HiBookOpen size={48} /></div>
          <p>No books found in the system.</p>
        </div>
      )}
    </div>
  );
}

export default AllBooks;
