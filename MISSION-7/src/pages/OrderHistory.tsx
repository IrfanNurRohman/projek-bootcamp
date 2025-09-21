import { useState } from "react";
import InvoiceCard from "../components/molecules/InvoiceCard";
// import SortDropdown from "../components/molecules/SortDropDown";
// import { Search } from "lucide-react";
import HeaderTabs from "../components/molecules/HeaderTabs";
import { isValidStatus } from "../utils/status";
const paymentHistoryTabs = [
  { id: 1, label: "Semua Pesanan" },
  { id: 2, label: "Menunggu Pembayaran" },
  { id: 3, label: "Berhasil" },
  { id: 4, label: "Gagal" },
];

const invoiceData = [
  {
    invoiceNumber: "INV-20250824-001",
    date: "24 Agustus 2025",
    time: "14:30",
    status: "Gagal", // atau "Gagal", "Pending"
    courseTitle: "React untuk QA Engineer",
    price: 250000,
    total: 250000,
  },
  {
    invoiceNumber: "INV-20250824-002",
    date: "24 Agustus 2025",
    time: "14:30",
    status: "Berhasil",
    courseTitle: "React untuk QA Engineer",
    price: 250000,
    total: 250000,
  },
  {
    invoiceNumber: "INV-20250824-003",
    date: "24 Agustus 2025",
    time: "14:30",
    status: "Pending",
    courseTitle: "React untuk QA Engineer",
    price: 250000,
    total: 250000,
  },
];

const OrderHistory = () => {
  const [activeTabId, setActiveTabId] = useState(1);


  return (
    <div>
      {/* <h1 className="text-2xl font-bold mb-4 text-red-400">Order History</h1> */}
      <div className="py-4 px-4">
        <div className="flex flex-row">
          <header className="bg-white shadow-md mb-4 w-full">
            <div className=" flex flex-col md:flex-row md:items-center justify-center gap-4 py-4">
              <HeaderTabs
                tabs={paymentHistoryTabs}
                activeTabId={activeTabId}
                onTabChange={setActiveTabId}
              />
            </div>
          </header>
        </div>

        {/* <InvoiceCard
          invoiceNumber="HEL/VI/10062023"
          date="10 Juni 2023"
          time="14:17"
          status="Berhasil"
          courseTitle="Belajar Microsoft Office dan Google Workspace untuk Pemula"
          price={300000}
          total={300000}
        /> */}
        {invoiceData.map((invoice) => (
          <InvoiceCard
            key={invoice.invoiceNumber}
            invoiceNumber={invoice.invoiceNumber}
            date={invoice.date}
            time={invoice.time}
            status={isValidStatus(invoice.status) ? invoice.status : "Pending"}
            courseTitle={invoice.courseTitle}
            price={invoice.price}
            total={invoice.total}
          />
        ))}
      </div>

      {/* Render order history items here */}
    </div>
  );
};

export default OrderHistory;
