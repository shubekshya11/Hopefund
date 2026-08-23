import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/public/Home";
import ReportIssue from "./pages/citizen/ReportIssue";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav className="navbar">
          <Link to="/">HopeFund</Link>
          <Link to="/report">Report an issue</Link>
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
