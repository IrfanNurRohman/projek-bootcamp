// import React from "react";

type PaymentProgressProps = {
  currentStep: "method" | "pay" | "done";
};

export default function PaymentProgress({ currentStep }: PaymentProgressProps) {
  const steps = [
    { key: "method", label: "Pilih Metode" },
    { key: "pay", label: "Bayar" },
    { key: "done", label: "Selesai" },
  ];

  const getStatus = (key: string) => {
    if (key === currentStep) return "active";
    const index = steps.findIndex(s => s.key === key);
    const currentIndex = steps.findIndex(s => s.key === currentStep);
    return index < currentIndex ? "done" : "pending";
  };

  return (
    <div className="flex justify-between items-center max-w-md mx-auto px-1 mb-4">
      {steps.map((step, idx) => {
        const status = getStatus(step.key);
        const isLast = idx === steps.length - 1;

        return (
          <div key={step.key} className="flex items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold
                ${status === "done" ? "bg-green-600" : status === "active" ? "bg-green-500" : "bg-gray-300"}
              `}
            >
              {status === "done" ? "✓" : idx + 1}
            </div>
            <span className="ml-2 text-sm text-gray-700">{step.label}</span>
            {!isLast && <div className="mx-2 h-0.5 w-6 bg-gray-300" />}
          </div>
        );
      })}
    </div>
  );
}