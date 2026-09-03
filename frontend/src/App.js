import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import HomeScreen from "./components/HomeScreen";
import BookDetails from "./components/BookDetails";
import UpdateName from "./components/UpdateName";
import DelBook from "./components/DelBook.jsx";
import DelUser from "./components/DelUser.jsx";
import AddUser from "./components/AddUser";
import AddAuthor from "./components/AddAuthor";
import AddBook from "./components/AddBook";
import AddReview from "./components/AddReview";
import AllUsers from "./components/AllUsers";
import AllBooks from "./components/AllBooks";
import AllReviews from "./components/AllReviews";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
          <div className="container-fluid px-4">
            <Link className="navbar-brand fw-bold" to="/">📚 LMS</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    User Operations
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="userDropdown">
                    <li><Link to="/adduser" className="dropdown-item">Add User</Link></li>
                    <li><Link to="/allusers" className="dropdown-item">All Users</Link></li>
                    <li><Link to="/fetchusers" className="dropdown-item">Fetch User</Link></li>
                    <li><Link to="/updateName" className="dropdown-item">Update Name</Link></li>
                    <li><Link to="/deleteUser" className="dropdown-item">Delete User</Link></li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" id="bookDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Book & Reviews
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="bookDropdown">
                    <li><Link to="/addauthor" className="dropdown-item">Add Author</Link></li>
                    <li><Link to="/addbook" className="dropdown-item">Add Book</Link></li>
                    <li><Link to="/allbooks" className="dropdown-item">All Books</Link></li>
                    <li><Link to="/allreviews" className="dropdown-item">All Reviews</Link></li>
                    <li><Link to="/addreview" className="dropdown-item">Add Review</Link></li>
                    <li><Link to="/bookDetails" className="dropdown-item">View Book Reviews</Link></li>
                    <li><Link to="/deleteBook" className="dropdown-item">Delete Book</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/allusers" element={<AllUsers />} />
          <Route path="/allbooks" element={<AllBooks />} />
          <Route path="/allreviews" element={<AllReviews />} />
          <Route path="/addauthor" element={<AddAuthor />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/addreview" element={<AddReview />} />
          <Route path="/fetchusers" element={<Home />} />
          <Route path="/updateName" element={<UpdateName />} />
          <Route path="/bookDetails" element={<BookDetails />} />
          <Route path="/deleteBook" element={<DelBook />} />
          <Route path="/deleteUser" element={<DelUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
