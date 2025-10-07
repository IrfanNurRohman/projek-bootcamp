// import React, { Component } from "react";
// import HeaderDashboard from "../components/HeaderDashboard";
import Logo from "../components/molecules/Logo";
import MoreMenu from "../components/molecules/More";
import PaymentProgress from "../components/molecules/PaymentProgress";
import ImagePaymentCompleted from "../components/molecules/ImagePaymentCompleted";
import { useNavigate } from "react-router-dom";

const PaymentCompleted = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* <HeaderDashboard isPaymentPage={true} isPaymentCompleted={true} /> */}
      <div className="flex items-center justify-between h-16 px-4">
        <Logo />
        <div className="block md:hidden">
          <MoreMenu />
        </div>
        <div className="hidden md:block">
          <PaymentProgress currentStep="done" />
        </div>
      </div>
      <div className="bg-[#fffdf2] min-h-screen flex flex-col items-center justify-center px-4">
        <div className="block md:hidden mb-10">
          <PaymentProgress currentStep="done" />
        </div>
        <div className="h-auto w-full max-w-md flex flex-col items-center justify-center text-center rounded-lg bg-white shadow-md gap-4 p-4">
          <ImagePaymentCompleted />
          <h1 className="font-bold text-xl mb-2">Pembayaran Berhasil!</h1>
          <p className="text-sm px-4">
            Silahkan cek email kamu untuk informasi lebih lanjut. Hubungi kami
            jika kamu tidak menerima email.
          </p>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            onClick={() => navigate("/order-history")}
          >
            Lihat Detail Pemesanan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCompleted;
