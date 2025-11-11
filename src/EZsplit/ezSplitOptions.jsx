import { useParams, useNavigate, useLocation } from "react-router";

const EZSplitOptions = () => {
  const { tableNumber } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const guestCount = location.state?.guestCount || 2;

  const handlePayInFull = () => {
    // Navigate to Pay in Full page
    navigate(`/table/${tableNumber}/pay-full`, {
      state: { guestCount },
    });
  };
  const handleEZSplit = () => {
    // Navigate to EZSplit page
    navigate(`/table/${tableNumber}/ezsplit`, {
      state: { guestCount },
    });
  };
  return (
    <div className="ezsplit-options-container">
      {/* Header with Logo and Tagline */}
      <header className="options-header">
        <div className="logo-container">
          <img src="/ezsplit-logo.jpg" alt="EZSplit Logo" className="logo" />
        </div>
        <h1 className="tagline">Making Dining Fun</h1>
        <p className="table-info">Table #{tableNumber}</p>
      </header>
      {/* Main Content */}
      <main className="options-main">
        <div className="options-section">
          <h2>Choose Your Payment Option</h2>
          <p className="options-subtitle">
            How would you like to handle your bill?
          </p>
          <div className="button-container">
            <button
              className="option-button pay-full-button"
              onClick={handlePayInFull}
            >
              <div className="button-icon">💳</div>
              <div className="button-content">
                <h3>Pay in Full</h3>
                <p>One person pays the full bill</p>
              </div>
            </button>
            <button
              className="option-button ezsplit-button"
              onClick={handleEZSplit}
            >
              <div className="button-icon">🧾</div>
              <div className="button-content">
                <h3>EZSplit</h3>
                <p>Split the bill among multiple people</p>
              </div>
            </button>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="options-footer">
        <button className="back-button" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </footer>
    </div>
  );
};
export default EZSplitOptions;
