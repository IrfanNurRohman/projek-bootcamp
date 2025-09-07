import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import AllProducts from './pages/AllProducts';
import DetailProduct from './pages/DetailProduct';
import PaymentPage from './pages/PaymentPage';
import MethodePaymentPage from './pages/MethodePaymentPage';
import PaymentCompleted from './pages/PaymentCompleted';
import PaymentPending from './components/molecules/PaymentPending';
import OrderHistory from './pages/OrderHistory';

function App() {
  return (
    <Routes>
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
          path="/login"
          element={
            <LoginPage
              mode="login"
              onSubmit={() => {}}
              heading="Pendaftaran Akun"
              subheading="Yuk, daftarkan akunmu sekarang juga!"
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/detail-product" element={<DetailProduct />} />
        <Route path="/payment-methode" element={<MethodePaymentPage />} />
        <Route path="/payment-page" element={<PaymentPage />} />
        <Route path="/payment-completed" element={<PaymentCompleted />} />
        <Route path="/payment-pending" element={<PaymentPending />} />
        <Route path="/order-history" element={<OrderHistory />} />
  </Routes>
  );
}

export default App;