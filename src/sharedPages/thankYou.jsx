import { useParams, useNavigate } from "react-router";

// Thank You Page Component
const ThankYouPage = () => {
  const { tableNumber } = useParams(); // Get table number from URL params
  const navigate = useNavigate(); // Navigation hook
  const handleGoHome = () => {
    navigate("/");
  };
  // Render Thank You Page
  return (
    <div className="thank-you-container">
      {/* Header with Logo and Tagline */}
      <header className="thank-you-header">
        <div className="logo-container">
          <img src="/ezsplit-logo.jpg" alt="EZSplit Logo" className="logo" />
        </div>
        <h1 className="tagline">Making Dinning Fun</h1>
      </header>
      {/* Main Content */}
      <main className="thank-you-main">
        <div className="thank-you-content">
          <div className="thank-you-icon">✅</div>
          <h2 className="thank-you-message">Thank you for dinning with us!</h2>
          <p className="thank-you-subtitle">
            We hope you enjoyed your experience at Table #{tableNumber}
          </p>
          <div className="thank-you-actions">
            <button className="home-button" onClick={handleGoHome}>
              Return to Home
            </button>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="thank-you-footer">
        <p className="footer-text">Have a wonderful day!</p>
      </footer>
    </div>
  );
};
export default ThankYouPage;
