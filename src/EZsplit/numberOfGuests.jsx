import { useState } from "react";
import { useNavigate, useParams } from "react-router";

const NumberOfGuests = () => {
  const { tableNumber } = useParams();
  const navigate = useNavigate();
  const [guestCount, setGuestCount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const count = parseInt(guestCount, 10);
    if (count > 0) {
      navigate(`/table/${tableNumber}/options`, {
        state: { guestCount: count },
      });
    }
  };

  return (
    <div className="numberOfGuests-container">
      {/* Header */}
      <header className="options-header">
        <div className="logo-container">
          <img
            src="/ezsplit-logo.jpg"
            alt="EZSplit Logo"
            className="logo"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
        <h1 className="tagline">Making Dining Fun</h1>
        <p className="table-info">Table #{tableNumber}</p>
      </header>

      <main className="options-main">
        <div className="options-section">
          <h2>Enter Number of Guests</h2>
          <p className="options-subtitle">
            How many people are splitting the bill?
          </p>
          <form onSubmit={handleSubmit} className="numberOfGuests-form">
            <div className="input-group">
              <label htmlFor="guestCount" className="table-label">
                Number of Guests
              </label>
              <input
                id="guestCount"
                type="number"
                min="1"
                step="1"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                placeholder="e.g., 4"
                required
                className="numberOfGuests-input"
              />
            </div>
            <div className="button-container">
              <button type="submit" className="option-button ezsplit-button">
                Continue
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="options-footer">
        <button className="back-button" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </footer>
    </div>
  );
};

export default NumberOfGuests;
