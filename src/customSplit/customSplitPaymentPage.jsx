import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
const PayForCustomSplit = () => {
  const { tableNumber } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // Mock total bill amount - in a real app, this would come from your backend
  const { SelectItems = [], totalAmount = 0 } = location.state || {};
  // Payment form state
  const [paymentInfo, setPaymentInfo] = useState({
    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
  });
  // Handle input changes with formatting
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value; // Default to raw value
    // Format card number (add spaces every 4 digits)
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s+/g, "") // Remove existing spaces
        .replace(/[^0-9]/gi, "") // Remove non-numeric characters
        .replace(/(.{4})/g, "$1 ") // Add space every 4 characters
        .trim(); // Remove trailing space
    }
    // Format expiration date (MM/YY)
    if (name === "expirationDate") {
      formattedValue = value
        .replace(/\D/g, "") // Remove non-digits
        .replace(/(\d{2})(\d)/, "$1/$2") // Add slash after 2 digits
        .substring(0, 5); // Limit to MM/YY format
    }
    // Update state
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: formattedValue, // Use formatted value
    }));
  };
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would process the payment here
    console.log("Payment submitted:", paymentInfo);
    // Navigate to receipt page after payment processing
    navigate(`/table/${tableNumber}/receipt`);
  };
  return (
    <div className="full-payment-container">
      {/* Header with Logo and Tagline */}
      <header className="payment-header">
        <div className="logo-container">
          <img src="/ezsplit-logo.jpg" alt="EZSplit Logo" className="logo" />
        </div>
        <h1 className="tagline">Making Dinning Fun</h1>
        <p className="table-info">Table #{tableNumber}</p>
      </header>
      {/* Main Content */}
      <main className="payment-main">
        <div className="payment-section">
          <h2>Making Full Payment</h2>
          {/* Bill Display Section */}
          <div className="bill-display">
            <h3>Total Amount</h3>
            <div className="total-amount">${totalAmount.toFixed(2)}</div>
            <p className="amount-description">
              Complete bill for Table #{tableNumber}
            </p>
          </div>
          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="payment-form">
            <h3>Payment Information</h3>
            <div className="form-group">
              <label htmlFor="nameOnCard" className="form-label">
                Name on Credit Card
              </label>
              <input
                id="nameOnCard"
                type="text"
                name="nameOnCard"
                value={paymentInfo.nameOnCard}
                onChange={handleInputChange}
                placeholder="Enter cardholder name"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardNumber" className="form-label">
                Card Number
              </label>
              <input
                id="cardNumber"
                type="text"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className="form-input"
                maxLength="23"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="expirationDate" className="form-label">
                Expiration Date
              </label>
              <input
                id="expirationDate"
                type="text"
                name="expirationDate"
                value={paymentInfo.expirationDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                className="form-input"
                maxLength="5"
                required
              />
            </div>
            <button type="submit" className="payment-submit-button">
              Process Payment
            </button>
          </form>
        </div>
      </main>
      {/* Footer */}
      <footer className="payment-footer">
        <button
          className="back-button"
          onClick={() => navigate(`/table/${tableNumber}/options`)}
        >
          ← Back to Options
        </button>
      </footer>
    </div>
  );
};
export default PayForCustomSplit;
