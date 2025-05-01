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
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Subscription from "./pages/Subscription";
import { useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import Chat from './pages/Chat';
import { useEffect } from "react";



function App() {
  const { loading, user:currentUser } = useAuth();

  useEffect(() => {
    // Correct existing cookies
    document.cookie = `_ga=; path=/; domain=.${window.location.hostname}; Secure; SameSite=None`;
    document.cookie = `_ga_KJNDCPKHNS=; path=/; domain=.${window.location.hostname}; Secure; SameSite=None`;
    
    // Set new cookies with proper domain
    const gaCookie = `_ga=GA1.2.${Math.random().toString(36).substring(2, 8)}; ` +
                     `domain=.${window.location.hostname}; ` +
                     `path=/; ` +
                     `max-age=63072000; ` +
                     `Secure; ` +
                     `SameSite=None`;
    
    const ga4Cookie = `_ga_KJNDCPKHNS=GS1.1.${Date.now()}.1; ` +
                      `domain=.${window.location.hostname}; ` +
                      `path=/; ` +
                      `max-age=63072000; ` +
                      `Secure; ` +
                      `SameSite=None`;
    
    document.cookie = gaCookie;
    document.cookie = ga4Cookie;
  }, []);

  if (loading) return <div>Loading...</div>;

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
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/pgs" element={<PGs />} />
              <Route path="/roommate" element={<Roommate />} />
              <Route path="/update" element={<Update />} />
              <Route path="/subscription" element={<Subscription />} />
            </Route>
          </Routes>

          {/* Only show chat if user is logged in */}
          {currentUser && <Chat />}
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
