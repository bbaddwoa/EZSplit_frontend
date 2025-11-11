import { useParams, useNavigate } from "react-router";

const CustomOrSplit = () => {
  const { tableNumber } = useParams();
  const navigate = useNavigate();
  const handleSplitEvenly = () => {
    // Navigate to Pay in Full page
    navigate(`/table/${tableNumber}/split-evenly`);
  };
  const handleCustomSplit = () => {
    // Navigate to EZSplit page
    navigate(`/table/${tableNumber}/custom-split`);
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
          <h2>Choose EZSplit Option</h2>
          <p className="options-subtitle">
            How would you like to split your bill?
          </p>
          <div className="button-container">
            <button
              className="option-button pay-full-button"
              onClick={handleSplitEvenly}
            >
              <div className="button-icon">:scales:</div>
              <div className="button-content">
                <h3>Split Evenly</h3>
                <p>Split check into even payments between all guests</p>
              </div>
            </button>
            <button
              className="option-button ezsplit-button"
              onClick={handleCustomSplit}
            >
              <div className="button-icon">:art:</div>
              <div className="button-content">
                <h3>Custom Split</h3>
                <p>Select items to pay for from bill</p>
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
export default CustomOrSplit;
