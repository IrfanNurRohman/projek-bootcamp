import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import AllProducts from "./pages/AllProducts";
import DetailProduct from "./pages/DetailProduct";
import PaymentPage from "./pages/PaymentPage";
import MethodePaymentPage from "./pages/MethodePaymentPage";
import PaymentCompleted from "./pages/PaymentCompleted";
import PaymentPending from "./components/molecules/PaymentPending";
import OrderHistory from "./pages/OrderHistory";
import PretestRulesPage from "./pages/PretestRulesPage";
import PretestPage from "./pages/PretestPage";
import VideoClass from "./pages/VideoClass";
import MyClass from "./pages/MyClass";
import SummaryPage from "./pages/SummaryPage";
import QuizPage from "./pages/QuizPage";
import CongratsPage from "./pages/CongratsPage";
import TryAgainPage from "./pages/TryAgainPage";
import ProfilePage from "./pages/ProfilPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* ========================= PUBLIC ROUTES ========================= */}
      <Route
        path="/"
        element={
          <LoginPage
            mode="login"
            onSubmit={() => {}}
            heading="Masuk ke Akun"
            subheading="Yuk, lanjutin belajarmu di videobelajar."
          />
        }
      />

      <Route
        path="/register"
        element={
          <RegisterPage
            mode="register"
            onSubmit={() => {}}
            heading="Pendaftaran Akun"
            subheading="Yuk, daftarkan akunmu sekarang juga!"
          />
        }
      />

      {/* ========================= PROTECTED ROUTES ========================= */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/all-products"
        element={
          <ProtectedRoute>
            <AllProducts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/detail-product/:id"
        element={
          <ProtectedRoute>
            <DetailProduct />
          </ProtectedRoute>
        }
      />

      {/* PAYMENT */}
      <Route
        path="/payment-methode"
        element={
          <ProtectedRoute>
            <MethodePaymentPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment-page"
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment-completed"
        element={
          <ProtectedRoute>
            <PaymentCompleted />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment-pending"
        element={
          <ProtectedRoute>
            <PaymentPending />
          </ProtectedRoute>
        }
      />

      {/* TEST & COURSE FLOW */}
      <Route
        path="/pretest-rules"
        element={
          <ProtectedRoute>
            <PretestRulesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pretest"
        element={
          <ProtectedRoute>
            <PretestPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/video-class"
        element={
          <ProtectedRoute>
            <VideoClass />
          </ProtectedRoute>
        }
      />

      <Route
        path="/summary"
        element={
          <ProtectedRoute>
            <SummaryPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/quiz"
        element={
          <ProtectedRoute>
            <QuizPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/congrats"
        element={
          <ProtectedRoute>
            <CongratsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tryagain"
        element={
          <ProtectedRoute>
            <TryAgainPage />
          </ProtectedRoute>
        }
      />

      {/* ORDER HISTORY & CLASS */}
      <Route
        path="/order-history"
        element={
          <ProtectedRoute>
            <OrderHistory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-class"
        element={
          <ProtectedRoute>
            <MyClass />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
