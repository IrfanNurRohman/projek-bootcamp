// import { AlignJustify } from "lucide-react";
import MoreMenu from "./molecules/More";
import PaymentProgress from "./molecules/PaymentProgress";

type HeaderDashboardProps = {
  isPaymentPage?: boolean;
  isPaymentCompleted?: boolean;
};

const HeaderDashboard: React.FC<HeaderDashboardProps> = ({
  isPaymentPage = false,
  isPaymentCompleted = false,
}) => {
  return (
    <>
      <div className="h-[74px] w-full flex bg-white items-center justify-between px-4">
        <img
          src="logo.png"
          alt="Videobelajar Logo"
          className="h-[42px] w-[152px] ml-[24px] md:h-[56px] md:w-[237px] md:ml-[120px]"
        />
        {isPaymentCompleted && <PaymentProgress currentStep="done" />}

        {!isPaymentCompleted && !isPaymentPage && <MoreMenu />}

      </div>
    </>
  );
};

export default HeaderDashboard;
