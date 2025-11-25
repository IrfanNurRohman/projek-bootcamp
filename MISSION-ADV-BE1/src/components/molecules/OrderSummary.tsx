// import React from "react";
import { useNavigate } from "react-router-dom";



export default function OrderSummaryCard() {
    const navigate = useNavigate();
  const courseTitle =
    "Video Learning: Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager. ";
  const price = 767500;
  const adminFee = 7000;
  const total = price + adminFee;

  return (
    <div className=" mx-auto mt-8 p-6 bg-white rounded-lg shadow-2xl border">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Ringkasan Pesanan
      </h2>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <h2 className="text-lg text-gray-800 mb-4 max-w-md mr-12">{courseTitle}</h2>
          {/* <span>Harga Course</span> */}
          <span>Rp {price.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between">
          <span>Biaya Admin</span>
          <span>Rp {adminFee.toLocaleString("id-ID")}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-gray-900">
          <span>Total Pembayaran</span>
          <span>Rp {total.toLocaleString("id-ID")}</span>
        </div>
      </div>

      <button
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
        onClick={() => navigate("/payment-page")}
      >
        Beli Sekarang
      </button>
    </div>
  );
}
