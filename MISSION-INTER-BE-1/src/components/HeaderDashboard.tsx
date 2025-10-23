// import { AlignJustify } from "lucide-react";
import { Link } from "react-router-dom";
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
      <div className="h-[74px] w-full flex bg-white items-center justify-between px-4 shadow-sm">
        {/* Logo - klik ke dashboard */}
        <Link to="/dashboard" className="flex items-center">
          <img
            src="/logo.png" // ✅ ambil dari public/images/logo.png
            alt="Videobelajar Logo"
            className="h-[42px] w-[152px] ml-[24px] md:h-[56px] md:w-[237px] md:ml-[120px] object-contain"
          />
        </Link>

        {/* Progress bar jika payment selesai */}
        {isPaymentCompleted && <PaymentProgress currentStep="done" />}

        {/* Menu kanan hanya muncul kalau bukan payment page */}
        {!isPaymentCompleted && !isPaymentPage && <MoreMenu />}
      </div>
    </>
  );
};

export default HeaderDashboard;
