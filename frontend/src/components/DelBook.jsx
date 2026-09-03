import React, { useState } from 'react';
import { Card, Button, Container, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function DelBook() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const fetchData = async () => {
    if (!title.trim()) {
      alert("Please enter the title of the book");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/LMS/delete-book/${title}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the book');
      }

      const result = await response.text();
      setMessage(`✅ Book titled "${title}" was deleted successfully!`);
      setTitle('');
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "80vh" }}>
      <Card className="p-4 w-100 shadow-lg" style={{ maxWidth: "500px", backgroundColor: "rgba(255,255,255,0.95)" }}>
        <Card.Body>
          <Link to="/" className="btn btn-outline-secondary btn-sm mb-3">&#8592; Back</Link>
          <Card.Title className="text-center mb-4">🗑️ Delete Book by Title</Card.Title>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={title}
              onChange={handleTitleChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter book title"
            />
          </Form.Group>
          <div className="d-grid">
            <Button variant="danger" onClick={fetchData}>
              Delete Book
            </Button>
          </div>

          {message && (
            <Alert className="mt-4" variant={message.includes("Error") ? "danger" : "success"}>
              {message}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DelBook;
