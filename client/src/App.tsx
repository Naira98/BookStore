import { Route, Routes } from "react-router";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Book from "./pages/Book";
import History from "./pages/History";
import AddBook from "./pages/AddBook";
import AddAdmin from "./pages/AddAdmin";
import UpdateBook from "./pages/UpdateBook";
import UpdateUser from "./pages/UpdateUser";
import IsAdmin from "./components/IsAdmin";
import IsAuth from "./components/IsAuth";
import ProtectedLogin from "./components/ProtectedLogin";

function App() {
  return (
    <div className="text-cyan-600 bg-amber-50 tracking-wide min-h-screen  ">
      <Routes>
        <Route
          path="/register"
          element={
            <ProtectedLogin>
              <Register />
            </ProtectedLogin>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedLogin>
              <Login />
            </ProtectedLogin>
          }
        />
        <Route
          element={
            <IsAuth>
              <AppLayout />
            </IsAuth>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/book/:bookId" element={<Book />} />
          <Route path="/history" element={<History />} />
          <Route path="/update-user" element={<UpdateUser />} />
          <Route
            path="/add-book"
            element={
              <IsAdmin>
                <AddBook />
              </IsAdmin>
            }
          />
          <Route
            path="/update-book/:bookId"
            element={
              <IsAdmin>
                <UpdateBook />
              </IsAdmin>
            }
          />
          <Route
            path="/add-admin"
            element={
              <IsAdmin>
                <AddAdmin />
              </IsAdmin>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
