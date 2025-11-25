// import React, { Component } from "react";
import HeaderDashboard from "../components/HeaderDashboard";
import PaymentProgress from "../components/molecules/PaymentProgress";
// import CourseCard from "../components/molecules/CourseCard";
// import BannerCard from "../components/molecules/BannerCard";
import CoursePromoBanner from "../components/molecules/CoursePromoBanner";
import OrderCountdown from "../components/molecules/OrderCountdown";
import PaymentCard from "../components/molecules/PaymentCard";
// import PaymentMethode from "../components/molecules/PaymentMethode";
import PaymentProcedures from "../components/molecules/PaymentProcedures";

const PaymentPage = () => {
  return (
    <div className="w-full">
        <HeaderDashboard />

        <OrderCountdown hours="14" minutes="39" seconds="51" />

        <div className="px-16">
          <PaymentProgress currentStep="pay" />

          <div className="flex flex-col md:flex-row-reverse gap-4">

            <CoursePromoBanner isBanner={false} />
            <div className="flex flex-col w-full gap-4">
              <PaymentCard />
              {/* <PaymentMethode /> */}
              <PaymentProcedures />
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default PaymentPage;
