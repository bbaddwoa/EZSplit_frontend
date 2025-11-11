import { useState } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const [tableNumber, setTableNumber] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (tableNumber.trim()) {
      navigate(`/table/${tableNumber}/number-of-guests`);
    }
  };
  return (
    <div className="home-container">
      {/* Header with Logo and Tagline */}
      <header className="home-header">
        <div className="logo-container">
          <img
            src="/ezsplit-logo.jpg"
            alt="EZSplit Logo"
            className="logo"
            onError={(e) => {
              console.log("Image failed to load:", e.target.src);
              e.target.style.display = "none";
            }}
            onLoad={() => console.log("Image loaded successfully")}
          />
          {/* Fallback text logo if image doesn't load */}
          <div className="text-logo" style={{ display: "none" }}>
            <h1
              style={{ color: "#667EEA", fontSize: "2rem", fontWeight: "bold" }}
            >
              EZSplit
            </h1>
          </div>
        </div>
        <h1 className="tagline">Welcome to EZSplit</h1>
        <p className="subtitle">Split your bill with ease!</p>
      </header>
      {/* Main Content */}
      <div className="home-main">
        <div className="table-input-section">
          <h2>Get Started</h2>
          <p className="instruction">Enter your table number</p>
          <form onSubmit={handleSubmit} className="table-form">
            <div className="input-group">
              <label htmlFor="tableNumber" className="table-label">
                Table Number
              </label>
              <input
                id="tableNumber"
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="Enter table number (1 - 20)"
                className="table-input"
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Continue
            </button>
          </form>
        </div>
      </div>
      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-label">Phone:</span>
              <a href="tel:777-245-4496" className="contact-link">
                777-245-4496
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-label">Email:</span>
              <a href="mailto:ezsplit@gmail.com" className="contact-link">
                ezsplit@gmail.com
              </a>
            </div>
          </div>
          <div className="footer-text">
            <p>&copy; 2025 EZSplit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Home;
