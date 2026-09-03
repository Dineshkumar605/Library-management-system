import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import NotFound from "./components/NotFound";
import PageLayout from "./components/PageLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
