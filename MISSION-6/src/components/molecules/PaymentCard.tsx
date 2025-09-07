import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCard: React.FC = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      navigate("/payment-completed");
    }, 2000);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md border border-gray-200 p-5">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Metode Pembayaran
      </h2>

      <div className="bg-white p-4 rounded-md shadow-lg mb-4 flex flex-col items-center">
        <p className="font-medium text-gray-800">
          Bayar Melalu Virtual Account BCA
        </p>
        <div className="flex flex-row items-center mt-2 gap-3">
          <p className="text-lg font-mono text-gray-800 tracking-wider">
            11739 081234567890
          </p>
          <p className="text-lg font-mono text-red-700">Salin</p>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mb-4">
        <p className="font-medium text-gray-800">
          Ringkasan Pesanan
        </p>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2 text-gray-700 mb-4">
        <div className="flex justify-between">
          <span className="font-normal w-[70%] md:font-medium">Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager</span>
          <span>Rp 767.500</span>
        </div>
        <div className="flex justify-between">
          <span>Biaya Admin</span>
          <span>Rp 7.000</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-semibold text-green-500">
          <span>Total</span>
          <span>Rp 774.500</span>
        </div>
      </div>

      {/* Virtual Account Info */}


      {/* Action Buttons */}
      <div className="flex flex-col-reverse gap-2 md:flex-row">
        <button className="w-full text-green-500 py-2 rounded-md border border-green-500 hover:bg-[#fff5f2] transition">
          Ganti Metode Pembayaran
        </button>
        <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        onClick={handlePayment}
        >
          Bayar Sekarang
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
