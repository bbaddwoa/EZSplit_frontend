import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useApi } from "../API/ApiContext"; // Import your API context

const FullPaymentPage = () => {
  const { tableNumber } = useParams();
  const navigate = useNavigate();
  const { request } = useApi();

  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [paymentInfo, setPaymentInfo] = useState({
    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
  });

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const data = await request(`/tables/${tableNumber}/bill`);
        setTotalAmount(data.totalAmount);
        // may need to adjust ^ if API returns differently
      } catch (err) {
        console.error(err);
        setError("Unable to load bill.");
      } finally {
        setLoading(false);
      }
    };
    fetchBill();
  }, [tableNumber, request]);

  // Handle input changes with formatting
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s+/g, "")
        .replace(/[^0-9]/gi, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
    }

    if (name === "expirationDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .substring(0, 5);
    }

    setPaymentInfo((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment submitted:", paymentInfo);
    navigate(`/table/${tableNumber}/receipt`);
  };

  if (loading) return <p>Loading total bill...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="full-payment-container">
      <header className="payment-header">
        <div className="logo-container">
          <img src="/ezsplit-logo.jpg" alt="EZSplit Logo" className="logo" />
        </div>
        <h1 className="tagline">Making Dinning Fun</h1>
        <p className="table-info">Table #{tableNumber}</p>
      </header>

      <main className="payment-main">
        <div className="payment-section">
          <h2>Making Full Payment</h2>
          <div className="bill-display">
            <h3>Total Amount</h3>
            <div className="total-amount">${totalAmount.toFixed(2)}</div>
            <p className="amount-description">
              Complete bill for Table #{tableNumber}
            </p>
          </div>

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

export default FullPaymentPage;
