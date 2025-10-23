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

function App() {
  return (
    <Routes>
      {/* LOGIN */}
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

      {/* REGISTER */}
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

      {/* DASHBOARD */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* ALL PRODUCTS */}
      <Route path="/all-products" element={<AllProducts />} />

      {/* PROFILE */}
      <Route path="/profile" element={<ProfilePage />} /> 

      {/* DETAIL PRODUCT */}
      {/* gunakan :id agar bisa terima parameter dari AllProducts */}
      <Route path="/detail-product/:id" element={<DetailProduct />} />



      {/* PAYMENT */}
      <Route path="/payment-methode" element={<MethodePaymentPage />} />
      <Route path="/payment-page" element={<PaymentPage />} />
      <Route path="/payment-completed" element={<PaymentCompleted />} />
      <Route path="/payment-pending" element={<PaymentPending />} />
      <Route path="/pretest-rules" element={<PretestRulesPage />} />
      <Route path="/pretest" element={<PretestPage />} />
      <Route path="/congrats" element={<CongratsPage />} />
      <Route path="/tryagain" element={<TryAgainPage />} />
      <Route path="/video-class" element={<VideoClass />} />
      <Route path="/summary" element={<SummaryPage />} />
      <Route path="/quiz" element={<QuizPage />} />;


      

      {/* ORDER HISTORY */}
      <Route path="/order-history" element={<OrderHistory />} />
      <Route path="/my-class" element={<MyClass />} />
    </Routes>
  );
}

export default App;
