import React, { useState } from "react";
import { Container, Card, Button, Alert, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AllBooks() {
  const [books, setBooks] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState("");

  const fetchAllBooks = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/LMS/fetch-all-books"
      );

      if (response.status === 404) {
        setBooks([]);
        setError("No books found");
        return;
      }

      const json = await response.json();
      setBooks(json);
      setFetched(true);
      setError("");
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching data.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "80vh" }}>
      <Card className="p-4 w-100 shadow-lg" style={{ maxWidth: "800px", backgroundColor: "rgba(255,255,255,0.95)" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">📚 All Books</Card.Title>

          <div className="d-grid mb-3">
            <Button variant="primary" onClick={fetchAllBooks}>
              Fetch All Books
            </Button>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          {fetched && books.length > 0 && (
            <Table striped bordered hover className="mt-3">
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
                    <td>{book.title}</td>
                    <td>{book.authorName}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {fetched && books.length === 0 && !error && (
            <Alert variant="info" className="mt-3">
              No books found in the system.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AllBooks;