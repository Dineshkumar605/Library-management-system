import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { HiBookOpen } from "react-icons/hi";
import { apiGet } from "../api";

function AllBooks() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllBooks = async () => {
      setLoading(true);
      const { data, error: err } = await apiGet("/fetch-all-books");
      if (err) { setError(err); setBooks([]); }
      else { setBooks(data || []); setError(""); }
      setLoading(false);
    };
    fetchAllBooks();
  }, []);

  return (
    <div className="card data-card fade-in">
      <div className="page-header">
        <div className="icon"><HiBookOpen size={22} /></div>
        <h1>All Books</h1>
      </div>

      {loading && (
        <div className="empty-state">
          <span className="spinner spinner-dark" />
          <p>Loading books...</p>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && books.length > 0 && (
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

      {!loading && books.length === 0 && !error && (
        <div className="empty-state">
          <div className="icon"><HiBookOpen size={48} /></div>
          <p>No books found in the system.</p>
        </div>
      )}
    </div>
  );
}

export default AllBooks;
