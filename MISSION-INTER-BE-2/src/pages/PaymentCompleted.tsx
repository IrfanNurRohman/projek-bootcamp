import Logo from "../components/molecules/Logo";
import MoreMenu from "../components/molecules/More";
import PaymentProgress from "../components/molecules/PaymentProgress";
import ImagePaymentCompleted from "../components/molecules/ImagePaymentCompleted";
import { useNavigate } from "react-router-dom";
import courseImage from "../data/courseImage";
import avatarImage from "../data/avatarImage";
const PaymentCompleted = () => {
  const navigate = useNavigate();

  const handleViewOrder = () => {
    // 🔢 Pilih index acak dari gambar yang tersedia
    const courseImageIndex = Math.floor(Math.random() * courseImage.length);
    const avatarImageIndex = Math.floor(Math.random() * avatarImage.length);

    // ✅ Buat data order baru
    const newOrder = {
      invoiceNumber: `INV-${Date.now()}`,
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "Berhasil",
      courseTitle: "React untuk QA Engineer",
      price: 250000,
      total: 250000,
      instructorName: "Jenna Ortega",
      modules: 12,
      minutes: 360,
      courseImageIndex,
      avatarImageIndex,
      image: courseImage[courseImageIndex]?.url,
    };

    // ✅ Simpan ke orderHistory
    const existingOrders =
      JSON.parse(localStorage.getItem("orderHistory") || "[]") || [];
    const updatedOrders = [newOrder, ...existingOrders];
    localStorage.setItem("orderHistory", JSON.stringify(updatedOrders));

    // ✅ Simpan juga ke myClasses (sinkronisasi dengan halaman Kelas Saya)
    const existingClasses =
      JSON.parse(localStorage.getItem("myClasses") || "[]") || [];

    const newClass = {
      classId: newOrder.invoiceNumber,
      classTitle: newOrder.courseTitle,
      enrolledDate: newOrder.date,
      instructor: newOrder.instructorName,
      modules: newOrder.modules,
      minutes: newOrder.minutes,
      progress: 0,
      status: "Sedang Berjalan",
      courseImageIndex,
      avatarImageIndex,
      image: newOrder.image,
    };

    const updatedClasses = [newClass, ...existingClasses];
    localStorage.setItem("myClasses", JSON.stringify(updatedClasses));

    // ✅ Simpan juga ke latestOrder (opsional untuk tracking tambahan)
    localStorage.setItem("latestOrder", JSON.stringify(newOrder));

    // 🔁 Navigasi ke Order History
    navigate("/order-history");
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4">
        <Logo />
        <div className="block md:hidden">
          <MoreMenu />
        </div>
        <div className="hidden md:block">
          <PaymentProgress currentStep="done" />
        </div>
      </div>

      {/* Body */}
      <div className="bg-[#fffdf2] min-h-screen flex flex-col items-center justify-center px-4">
        <div className="block md:hidden mb-10">
          <PaymentProgress currentStep="done" />
        </div>

        <div className="h-auto w-full max-w-md flex flex-col items-center justify-center text-center rounded-lg bg-white shadow-md gap-4 p-4">
          {/* Gambar berhasil */}
          <img
            src="/assets/payment-success.png"
            alt="Payment Success"
            className="w-40 mb-2"
          />

          <ImagePaymentCompleted />
          <h1 className="font-bold text-xl mb-2">Pembayaran Berhasil!</h1>
          <p className="text-sm px-4">
            Silahkan cek email kamu untuk informasi lebih lanjut. Hubungi kami
            jika kamu tidak menerima email.
          </p>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            onClick={handleViewOrder}
          >
            Lihat Detail Pemesanan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCompleted;
