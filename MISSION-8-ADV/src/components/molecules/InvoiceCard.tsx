// components/InvoiceCard.tsx
import React from "react";
import courseImage from "../../data/courseImage";

type StatusType = "Berhasil" | "Gagal" | "Pending";

type InvoiceProps = {
  invoiceNumber: string;
  date: string;
  time: string;
  status: StatusType;
  courseTitle: string;
  price: number;
  total: number;
};

const statusColor: Record<StatusType, string> = {
  Berhasil: "bg-green-600",
  Gagal: "bg-red-600",
  Pending: "bg-yellow-400",
};

const InvoiceCard: React.FC<InvoiceProps> = ({
  invoiceNumber,
  date,
  time,
  status,
  courseTitle,
  price,
  total,
}) => {
  return (
    <div className=" mx-auto bg-white shadow-md rounded-lg border border-gray-200 p-6 text-sm font-sans mb-4 w-full">
      <div className="mb-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0 md:items-center">
          <div className="flex flex-row gap-6">
            <h2 className="font-semibold text-gray-800">
              <div className="hidden md:block">No. Invoice: </div>
              <a
                // href={`/invoice/${invoiceNumber}`}
                className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200"
              >
                {invoiceNumber}
              </a>
            </h2>
            <h2 className="font-sm md:font-semibold text-gray-800">
              <div className="hidden md:block">Waktu Pembayaran:</div>
              {date}, {time}
            </h2>
          </div>
          <span className={`${statusColor[status]} rounded-md p-2 text-white`}>
            {status}
          </span>
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <div className="mb-4 border-gray-200 pt-4 flex flex-col md:flex-row items-start gap-3">
          <div className="flex flex-row gap-4 md:gap-6">
            <img
              className="w-[52px] h-[52px] rounded-md"
              src={courseImage[0]}
              alt={courseTitle}
            />
            <p className="text-gray-800 text-xl font-bold">{courseTitle}</p>
          </div>
          <div className="flex flex-col md:basis-1/3 justify-center items-start">
            <span>Harga</span>
            <span>Rp {price.toLocaleString("id-ID")}</span>
          </div>
        </div>
        {/* untuk harga */}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center font-semibold text-gray-900 mt-2">
          <span className="text-gray-600">Total Pembayaran</span>
          <span className="text-green-600 font-bold text-2xl">Rp {total.toLocaleString("id-ID")}</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCard;
