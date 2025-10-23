// import React, { Component } from "react";
import PaymentMethode from "../components/molecules/PaymentMethode";
import CoursePromoBanner from "../components/molecules/CoursePromoBanner";
import OrderSummaryCard from "../components/molecules/OrderSummary";
import FooterContent from "../components/molecules/FooterContent";
import HeaderDashboard from "../components/HeaderDashboard";
// import { useNavigate } from "react-router-dom";

const MethodePaymentPage = () => {
  return (
    <div className=" px-4 ">
      <HeaderDashboard />
      <div>
        <div className="flex flex-col-reverse md:flex-row gap-6 w-full mx-auto">
          <div className="w-full">
            <PaymentMethode />
            <OrderSummaryCard />
          </div>
          <div className="w-full md:max-w-md">
            <CoursePromoBanner isBanner={false} />
          </div>
        </div>

        <FooterContent />
      </div>
    </div>
  );
};

export default MethodePaymentPage;
