/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PGs from "./pages/PGs";
import Roommate from "./pages/Roommate";
import Update from "./pages/Update";
import Login from "./pages/Auth";
import Profile from "./pages/Profile";
import Onboarding from "./pages/onboarding";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

function App() {
  const { loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />

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
