import { Route, Routes, Navigate, useParams } from "react-router";
import Layout from "./layout/Layout";
import Home from "./ezSplit/Home";
import NumberOfGuests from "./EZsplit/numberOfGuests";
import EZSplitOptions from "./ezSplit/ezSplitOptions";
import FullPaymentPage from "./payInFull/fullPaymentPage";
import SplitEvenlyPaymentPage from "./splitEvenly/splitEvenlyPaymentPage";
import SelectItems from "./customSplit/selectItems";
import ReceiptPage from "./sharedPages/receipt";
import ThankYouPage from "./sharedPages/thankYou";

// If user navigates directly to /table/:tableNumber/payment
// redirect them to the options page for consistency
const PaymentRedirect = () => {
  const { tableNumber } = useParams();
  return <Navigate to={`/table/${tableNumber}/options`} replace />;
};

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route
          path="/table/:tableNumber/number-of-guests"
          element={<NumberOfGuests />}
        />

        <Route
          path="/table/:tableNumber/options"
          element={<EZSplitOptions />}
        />

        <Route
          path="/table/:tableNumber/pay-full"
          element={<FullPaymentPage />}
        />
        <Route path="/table/:tableNumber/receipt" element={<ReceiptPage />} />
        <Route
          path="/table/:tableNumber/thank-you"
          element={<ThankYouPage />}
        />

        <Route
          path="/table/:tableNumber/split-evenly/:guestCount"
          element={<SplitEvenlyPaymentPage />}
        />
        <Route
          path="/table/:tableNumber/select-items"
          element={<SelectItems />}
        />

        <Route
          path="/table/:tableNumber/payment"
          element={<PaymentRedirect />}
        />
        <Route path="/options" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
