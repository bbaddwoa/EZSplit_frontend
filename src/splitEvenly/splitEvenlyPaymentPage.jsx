import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
// import "./splitEvenlyPayment.css";

function evenSplit(total, count) {
  const n = Number(count);
  if (!Number.isInteger(n) || n < 1) {
    throw new Error("count must be an integer >= 1");
  }
  const t = Number(total);
  if (!Number.isFinite(t) || isNaN(t)) {
    throw new Error("total must be a number");
  }
  const totalCents = Math.round(t * 100);
  if (totalCents < 0) throw new Error("total must be non-negative");
  const base = Math.floor(totalCents / n);
  const remainder = totalCents % n;
  const amounts = Array.from({ length: n }, (_, i) => {
    const cents = base + (i < remainder ? 1 : 0);
    return Number((cents / 100).toFixed(2));
  });
  return {
    amounts,
    perPerson: Number((base / 100).toFixed(2)),
    remainder,
    totalCents,
  };
}
export default function SplitEvenlyPayment() {
  const [total, setTotal] = useState("");
  const [guests, setGuests] = useState(2);
  const [tipMode, setTipMode] = useState("percent");
  const [tipValue, setTipValue] = useState(15);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  // Payment tracking state
  const [remaining, setRemaining] = useState(null); // cents per person
  const [paymentsHistory, setPaymentsHistory] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(0);
  const [payAmount, setPayAmount] = useState("");
  const [isFullyPaid, setIsFullyPaid] = useState(false);
  const { tableNumber } = useParams();
  const navigate = useNavigate();
  // Initialize tracking when result changes
  useEffect(() => {
    if (result) {
      const rem = result.amounts.map((a) => Math.round(a * 100));
      setRemaining(rem);
      setPaymentsHistory([]);
      setSelectedPerson(0);
      setPayAmount("");
      setIsFullyPaid(rem.every((c) => c === 0));
    } else {
      setRemaining(null);
      setIsFullyPaid(false);
    }
  }, [result]);
  const totalRemainingCents = () =>
    remaining ? remaining.reduce((s, v) => s + v, 0) : 0;
  const handlePay = () => {
    setError(null);
    if (!remaining) return setError("Compute split first");
    const idx = Number(selectedPerson);
    if (!(idx >= 0 && idx < remaining.length))
      return setError("Invalid person selected");
    const payCents = Math.round(Number(payAmount) * 100);
    if (!Number.isFinite(payCents) || payCents <= 0)
      return setError("Enter a positive payment amount");
    if (payCents > remaining[idx])
      return setError("Payment exceeds remaining amount for selected person");
    const next = [...remaining];
    next[idx] = next[idx] - payCents;
    setRemaining(next);
    setPaymentsHistory((h) => [
      { person: idx, amountCents: payCents, ts: Date.now() },
      ...h,
    ]);
    setPayAmount("");
    if (next.every((c) => c === 0)) {
      setIsFullyPaid(true);
      if (tableNumber)
        setTimeout(() => navigate(`/table/${tableNumber}/receipt`), 400);
    }
  };
  const handlePayFullForPerson = () => {
    if (!remaining) return setError("Compute split first");
    const idx = Number(selectedPerson);
    const payCents = remaining[idx];
    if (payCents <= 0) return setError("No remaining balance for this person");
    const next = [...remaining];
    next[idx] = 0;
    setRemaining(next);
    setPaymentsHistory((h) => [
      { person: idx, amountCents: payCents, ts: Date.now() },
      ...h,
    ]);
    setPayAmount("");
    if (next.every((c) => c === 0)) {
      setIsFullyPaid(true);
      if (tableNumber)
        setTimeout(() => navigate(`/table/${tableNumber}/receipt`), 400);
    }
  };
  const handleCompute = () => {
    setError(null);
    try {
      const subtotal = Number(total === "" ? 0 : total);
      const tipVal = Number(tipValue || 0);
      const tipAmount =
        tipMode === "percent" ? (subtotal * tipVal) / 100 : tipVal;
      const grandTotal = subtotal + tipAmount;
      const res = evenSplit(grandTotal, guests);
      // Also compute approximate per-person tip (not necessarily exact after cents distribution)
      const approxTipPerPerson = Number((tipAmount / guests).toFixed(2));
      setResult({
        ...res,
        tipAmount: Number(tipAmount.toFixed(2)),
        approxTipPerPerson,
        subtotal,
        grandTotal,
      });
    } catch (e) {
      setResult(null);
      setError(e.message);
    }
  };
  return (
    <div className="split-page">
      <div className="split-card">
        <h2 className="split-title">Split Evenly</h2>
        <div className="field-row">
          <label className="field-label">Subtotal</label>
          <input
            className="field-input"
            type="number"
            step="0.01"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            placeholder="e.g. 23.45"
          />
        </div>
        <div className="field-row">
          <label className="field-label">Tip</label>
          <div className="tip-controls">
            <select
              className="field-input"
              value={tipMode}
              onChange={(e) => setTipMode(e.target.value)}
            >
              <option value="percent">Percent</option>
              <option value="fixed">Fixed amount</option>
            </select>
            <input
              className="field-input"
              type="number"
              step="0.01"
              value={tipValue}
              onChange={(e) => setTipValue(e.target.value)}
              style={{ width: 120 }}
            />
            <span className="tip-suffix">
              {tipMode === "percent" ? "%" : "USD"}
            </span>
          </div>
        </div>
        <div className="field-row">
          <label className="field-label">Guests</label>
          <input
            className="field-input"
            type="number"
            min={1}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          />
        </div>
        <div className="actions">
          <button className="btn-primary" onClick={handleCompute}>
            Compute
          </button>
        </div>
        {error && <div className="error">Error: {error}</div>}
        {result && (
          <div className="result-card">
            <div className="result-row">
              <strong>Subtotal:</strong> ${result.subtotal.toFixed(2)}
            </div>
            <div className="result-row">
              <strong>Tip:</strong> ${result.tipAmount.toFixed(2)}
            </div>
            <div className="result-row">
              <strong>Grand total:</strong> ${result.grandTotal.toFixed(2)}
            </div>
            <div className="divider" />
            <div className="result-row">
              <strong>Per-person (approx tip):</strong> $
              {result.approxTipPerPerson.toFixed(2)}
            </div>
            <ol className="per-list">
              {result.amounts.map((a, i) => (
                <li key={i} className="per-item">
                  Person {i + 1}:{" "}
                  <span className="per-amount">${a.toFixed(2)}</span>
                </li>
              ))}
            </ol>
            <div className="result-row">
              <strong>Sum:</strong> $
              {result.amounts.reduce((s, v) => s + v, 0).toFixed(2)} (
              {result.totalCents} cents)
            </div>
            {/* Payment controls */}
            {remaining && (
              <div style={{ marginTop: 12 }}>
                {isFullyPaid && (
                  <div
                    className="result-row"
                    style={{ color: "var(--success)" }}
                  >
                    <strong>Paid in full :white_check_mark:</strong>
                  </div>
                )}
                <div className="result-row">
                  <strong>Total remaining:</strong> $
                  {(totalRemainingCents() / 100).toFixed(2)}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginTop: 8,
                  }}
                >
                  <label style={{ minWidth: 90 }}>Pay for</label>
                  <select
                    value={selectedPerson}
                    onChange={(e) => setSelectedPerson(Number(e.target.value))}
                    className="field-input"
                  >
                    {remaining.map((r, i) => (
                      <option key={i} value={i}>
                        Person {i + 1} (${(r / 100).toFixed(2)} remaining)
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="amount"
                    className="field-input"
                    style={{ width: 120 }}
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                  />
                  <button className="btn-primary" onClick={handlePay}>
                    Pay
                  </button>
                  <button
                    className="btn-primary"
                    onClick={handlePayFullForPerson}
                    style={{ background: "#10B981" }}
                  >
                    Pay Remaining
                  </button>
                </div>
                <div style={{ marginTop: 12 }}>
                  <h4>Payment history</h4>
                  <ul>
                    {paymentsHistory.length === 0 && <li>No payments yet</li>}
                    {paymentsHistory.map((p, idx) => (
                      <li key={idx}>
                        Person {p.person + 1}: $
                        {(p.amountCents / 100).toFixed(2)} —{" "}
                        {new Date(p.ts).toLocaleTimeString()}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
