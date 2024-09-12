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
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <div className="text-cyan-primary bg-amber-primary tracking-wide min-h-screen  ">
      <Routes>
        <Route
          element={
            <ProtectedRoutes>
              <AppLayout />
            </ProtectedRoutes>
          }
        >
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
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
      <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            // Define default options
            style: {
              fontSize: "15px",
              padding: "16px 24px",
              maxWidth: "500px",
              background: "#fffef5",
              color: "#fb923c",
            },

            // Default options for specific types
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
          }}
        />
    </div>
  );
}

export default App;
