import { useEffect, useState } from "react";
import SidebarMenu from "../components/molecules/SidebarMenu";
import HeaderTabs from "../components/molecules/HeaderTabs";
import InvoiceCard from "../components/molecules/InvoiceCard";
import { isValidStatus } from "../utils/status";
import HeaderDashboard from "../components/HeaderDashboard";
import FooterContent from "../components/molecules/FooterContent";

const paymentHistoryTabs = [
  { id: 1, label: "Semua Pesanan" },
  { id: 2, label: "Menunggu Pembayaran" },
  { id: 3, label: "Berhasil" },
  { id: 4, label: "Gagal" },
];

const OrderHistory = () => {
  const [activeTabId, setActiveTabId] = useState(1);
  const [invoiceData, setInvoiceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Ambil data dari server API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8000/api/orders"); // ganti sesuai port server kamu
        const data = await res.json();
        setInvoiceData(data);
      } catch (err) {
        console.error("Gagal mengambil data order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter data berdasarkan tab aktif
  const filteredData =
    activeTabId === 1
      ? invoiceData
      : invoiceData.filter((item) => {
          if (activeTabId === 2) return item.status === "Menunggu Pembayaran";
          if (activeTabId === 3) return item.status === "Berhasil";
          if (activeTabId === 4) return item.status === "Gagal";
          return true;
        });

  return (
    <div>
      <HeaderDashboard />
      <div className="min-h-screen bg-[#fffdf2] py-8 px-6 md:px-12">
        <h1 className="text-2xl font-bold mb-2">Daftar Pesanan</h1>
        <p className="text-gray-600 mb-6">
          Informasi terperinci mengenai pembelian kamu
        </p>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <SidebarMenu />

          <div className="flex-1">
            <HeaderTabs
              tabs={paymentHistoryTabs}
              activeTabId={activeTabId}
              onTabChange={setActiveTabId}
            />

            <div className="mt-6">
              {loading ? (
                <p className="text-gray-500">Memuat data...</p>
              ) : filteredData.length === 0 ? (
                <p className="text-gray-500">Belum ada pesanan</p>
              ) : (
                filteredData.map((invoice) => (
                  <InvoiceCard
                    key={invoice.invoice_number}
                    invoiceNumber={invoice.invoice_number}
                    date={invoice.payment_date}
                    time={invoice.payment_time}
                    status={
                      isValidStatus(invoice.status) ? invoice.status : "Pending"
                    }
                    courseTitle={invoice.course_title}
                    price={invoice.price}
                    total={invoice.total}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10">
        <FooterContent />
      </div>
    </div>
  );
};

export default OrderHistory;
