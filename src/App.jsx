import { Route, Routes, Navigate, useParams } from "react-router";
import Layout from "./layout/Layout";
// import Login from "./auth/Login";
// import Register from "./auth/Register";
import Home from "./ezSplit/home";
//import SimpleHome from "./SimpleHome";
import TestPage from "./TestPage";
import ApiTest from "./ApiTest";
import EZSplitOptions from "./ezSplit/ezSplitOptions";
import NumberOfGuests from "./ezSplit/NumberOfGuests";
import EZSplitPaymentPage from "./ezSplit/ezSplit-PaymentPage";
import SplitEvenlyPaymentPage from "./splitEvenly/splitEvenlyPaymentPage";
import CustomSplitPaymentPage from "./customSplit/customSplitPaymentPage";
import SelectItems from "./customSplit/selectItems";
import FullPaymentPage from "./payInFull/fullPaymentPage";
//import PaymentConfirmation from "./sharedFunctions/confirmation";
import ReceiptPage from "./sharedFunctions/receipt";
import ThankYouPage from "./sharedFunctions/thankYou";

// Component to handle payment route redirects
const PaymentRedirect = () => {
  const { tableNumber } = useParams();
  return <Navigate to={`/table/${tableNumber}/options`} replace />;
};

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/api-test" element={<ApiTest />} />
        <Route
          path="/table/:tableNumber/options"
          element={<EZSplitOptions />}
        />
        <Route
          path="/table/:tableNumber/pay-full"
          element={<FullPaymentPage />}
        />
        <Route
          path="/table/:tableNumber/number-of-guests"
          element={<NumberOfGuests />}
        />
        <Route
          path="/table/:tableNumber/ezsplit-payment/:guestCount"
          element={<EZSplitPaymentPage />}
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
          path="/table/:tableNumber/custom-split-payment"
          element={<CustomSplitPaymentPage />}
        />

        <Route path="/table/:tableNumber/receipt" element={<ReceiptPage />} />
        <Route
          path="/table/:tableNumber/thank-you"
          element={<ThankYouPage />}
        />

        {/* Redirect old payment route to options page */}
        <Route
          path="/table/:tableNumber/payment"
          element={<PaymentRedirect />}
        />

        {/* Redirect standalone /options to home page */}
        <Route path="/options" element={<Navigate to="/" replace />} />

        {/* Commented out until auth components are created */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Route>
    </Routes>
  );
}
