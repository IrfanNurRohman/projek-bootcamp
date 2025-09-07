import React, { useEffect, useMemo, useState } from "react";

// Helper: format to Indonesian Rupiah without decimals
const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

// Helper: split VA like "11739 081234567890"
const chunkVA = (va: string) => va.replace(/\s/g, "").replace(/(.{5})(.*)/, "$1 $2");

// Simple step indicator dot
const StepDot: React.FC<{ state: "done" | "active" | "todo"; label: string }>
  = ({ state, label }) => {
  const styles = {
    done: "bg-green-500 text-white",
    active: "border-2 border-green-500 text-green-700",
    todo: "bg-gray-200 text-gray-500",
  } as const;
  return (
    <div className="flex items-center gap-2">
      <div
        className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold ${
          state === "done" ? styles.done : state === "active" ? styles.active : styles.todo
        }`}
      >
        {state === "done" ? "✓" : state === "active" ? "2" : "3"}
      </div>
      <span className={`text-sm ${state === "active" ? "text-green-700" : "text-gray-600"}`}>
        {label}
      </span>
    </div>
  );
};

// Accordion item
const AccordionItem: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, children, defaultOpen }) => {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-4 lg:p-5 text-left font-medium"
      >
        <span>{title}</span>
        <svg
          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && <div className="px-4 lg:px-5 pb-4 lg:pb-5 text-sm text-gray-600">{children}</div>}
    </div>
  );
};

const CourseCard: React.FC = () => {
  return (
    <aside className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Image */}
      <div className="h-44 w-full bg-gradient-to-br from-gray-200 to-gray-300" aria-hidden />

      <div className="p-5">
        <h3 className="font-semibold text-gray-800 leading-snug">
          Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager.
        </h3>

        <div className="mt-2 flex items-center gap-3">
          <span className="text-green-600 font-bold">Rp 250K</span>
          <span className="text-gray-400 line-through">Rp 500K</span>
          <span className="text-xs bg-yellow-100 text-yellow-700 rounded-full px-2 py-0.5">Diskon 50%</span>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <div className="font-semibold text-gray-800">Kelas Ini Sudah Termasuk</div>
          <ul className="grid grid-cols-2 gap-2 text-gray-600">
            <li className="flex items-center gap-2"><span>📝</span>Ujian Akhir</li>
            <li className="flex items-center gap-2"><span>🎬</span>49 Video</li>
            <li className="flex items-center gap-2"><span>📄</span>7 Dokumen</li>
            <li className="flex items-center gap-2"><span>🎓</span>Sertifikat</li>
            <li className="flex items-center gap-2"><span>✅</span>Pretest</li>
          </ul>
        </div>

        <div className="mt-4 text-sm">
          <div className="font-semibold text-gray-800">Bahasa Pengantar</div>
          <div className="mt-1 text-gray-600 flex items-center gap-2">🌐 Bahasa Indonesia</div>
        </div>
      </div>
    </aside>
  );
};

const BannerTimer: React.FC<{ seconds: number }> = ({ seconds }) => {
  const hh = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return (
    <div className="w-full bg-amber-50 border border-amber-100 text-amber-800 rounded-xl p-3 flex items-center justify-between">
      <span className="text-sm">Selesaikan pemesanan dalam</span>
      <span className="font-semibold tabular-nums bg-white/70 rounded-md px-2 py-1 border border-amber-200">
        {hh} : {mm} : {ss}
      </span>
    </div>
  );
};

const VABox: React.FC<{ bank: string; va: string }> = ({ bank, va }) => {
  const [copied, setCopied] = useState(false);
  const value = useMemo(() => chunkVA(va), [va]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(va.replace(/\s/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 flex items-center gap-4">
      {/* Minimal bank mark */}
      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-50 border border-blue-200">
        <span className="text-blue-700 font-bold">{bank}</span>
      </div>
      <div className="flex-1">
        <div className="text-gray-800 font-medium">Bayar Melalui Virtual Account {bank}</div>
        <div className="mt-1 text-gray-600 flex items-center gap-3">
          <span className="font-mono tracking-wider">{value}</span>
          <button
            onClick={copy}
            className="text-green-600 hover:text-green-700 text-sm font-semibold"
          >
            {copied ? "Disalin!" : "Salin"}
          </button>
        </div>
      </div>
    </div>
  );
};

const PaymentSummary: React.FC = () => {
  const price = 767_500;
  const admin = 7_000;
  const total = price + admin;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <h3 className="font-semibold text-gray-800">Ringkasan Pesanan</h3>

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="text-gray-600 leading-snug">
            <div className="font-medium text-gray-800">Video Learning: Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager.</div>
          </div>
          <div className="text-gray-700 whitespace-nowrap">{formatIDR(price)}</div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Biaya Admin</span>
          <span className="text-gray-700">{formatIDR(admin)}</span>
        </div>
      </div>

      <div className="mt-4 border-t border-dashed border-gray-200 pt-4 flex items-center justify-between">
        <span className="font-semibold text-gray-800">Total Pembayaran</span>
        <span className="font-extrabold text-green-600">{formatIDR(total)}</span>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <button className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50">
          Ganti Metode Pembayaran
        </button>
        <button className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 shadow-sm">
          Bayar Sekarang
        </button>
      </div>
    </div>
  );
};

const HowToPay: React.FC = () => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 space-y-3">
      <h3 className="font-semibold text-gray-800">Tata Cara Pembayaran</h3>

      <AccordionItem title="Transfer Bank" defaultOpen>
        <ol className="list-decimal ml-5 space-y-1">
          <li>Buka aplikasi m-banking Anda.</li>
          <li>Pilih menu <span className="font-medium">Transfer &gt; Virtual Account</span>.</li>
          <li>Masukkan nomor VA lalu pastikan nama penerima benar.</li>
          <li>Masukkan nominal sesuai <span className="font-medium">Total Pembayaran</span>.</li>
          <li>Konfirmasi dan selesaikan pembayaran.</li>
        </ol>
      </AccordionItem>

      <AccordionItem title="E‑Wallet">
        <ol className="list-decimal ml-5 space-y-1">
          <li>Buka e‑wallet favorit Anda.</li>
          <li>Pilih menu pembayaran/transfer VA.</li>
          <li>Masukkan nomor VA dan ikuti instruksi hingga selesai.</li>
        </ol>
      </AccordionItem>

      <AccordionItem title="Kartu Kredit/Debit">
        <ol className="list-decimal ml-5 space-y-1">
          <li>Isi data kartu (nama, nomor, masa berlaku, CVV).</li>
          <li>Periksa kembali rincian tagihan Anda.</li>
          <li>Submit dan selesaikan proses 3‑D Secure/OTP.</li>
        </ol>
      </AccordionItem>
    </section>
  );
};

const Header: React.FC<{ seconds: number }>= ({ seconds }) => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 select-none">
          <span className="text-xl font-extrabold text-gray-900">video</span>
          <span className="text-xl font-extrabold text-orange-500">belajar</span>
        </div>

        {/* Steps */}
        <div className="hidden md:flex items-center gap-4">
          <StepDot state="done" label="Pilih Metode" />
          <div className="h-px w-8 bg-gray-200" />
          <StepDot state="active" label="Bayar" />
          <div className="h-px w-8 bg-gray-200" />
          <StepDot state="todo" label="Selesai" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-3">
        <BannerTimer seconds={seconds} />
      </div>
    </header>
  );
};

const Page: React.FC = () => {
  // 00:50:55 => 3055 seconds
  const [seconds, setSeconds] = useState(50 * 60 + 55);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-gray-900">
      <Header seconds={seconds} />

      <main className="mx-auto max-w-6xl px-4 py-6 lg:py-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-8">
        <section className="space-y-4 lg:space-y-6">
          <div>
            <h2 className="text-base lg:text-lg font-semibold mb-3">Metode Pembayaran</h2>
            <VABox bank="BCA" va="11739081234567890" />
          </div>

          <PaymentSummary />

          <HowToPay />
        </section>

        <div className="order-first lg:order-last">
          <CourseCard />
        </div>
      </main>

      <footer className="border-t border-gray-100">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-500 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <div>
            ©2025 Videobelajar. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a className="hover:text-gray-700" href="#">Perusahaan</a>
            <a className="hover:text-gray-700" href="#">Komunitas</a>
            <a className="hover:text-gray-700" href="#">Kontak</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
