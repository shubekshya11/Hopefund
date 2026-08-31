import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/public/Home";
import ReportIssue from "./pages/citizen/ReportIssue";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav className="navbar">
          <div className="navbar__left">
            <span className="navbar__logo-icon">📍</span>
            <Link to="/" className="navbar__brand">HopeFund</Link>
          </div>
          <div className="navbar__center">
            <Link to="/" className="navbar__link navbar__link--active">Home</Link>
            <Link to="/map" className="navbar__link">Map</Link>
            <Link to="/report" className="navbar__link">Report Issue</Link>
            <Link to="/about" className="navbar__link">About</Link>
          </div>
          <div className="navbar__right">
            <span className="navbar__lang-icon">🌐</span>
            <span className="navbar__lang">EN</span>
            <button className="navbar__signin">Sign In</button>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportIssue />} />
          {/* TODO: /issues/:id detail page, /government/*, /admin/* dashboards */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
