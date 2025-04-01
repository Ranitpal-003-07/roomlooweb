/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; // Ensure global styles
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PGs from "./pages/PGs";
import Roommate from "./pages/Roommate";
import Update from "./pages/Update";
import Login from "./pages/Auth";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;
  return (
      <Router>
        <div className="app-container">
          <ToastContainer position="top-right" autoClose={3000} />
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Login />} />
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/pgs" element={<PGs />} />
                <Route path="/roommate" element={<Roommate />} />
                <Route path="/update" element={<Update />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
