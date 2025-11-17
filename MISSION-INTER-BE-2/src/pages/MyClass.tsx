import { useEffect, useState } from "react";
import SidebarMenu from "../components/molecules/SidebarMenu";
import { useNavigate } from "react-router-dom";
import courseImage from "../data/courseImage";
import avatarImage from "../data/avatarImage";
import HeaderDashboard from "../components/HeaderDashboard";
import FooterContent from "../components/molecules/FooterContent";

const MyClass = () => {
  const [myClasses, setMyClasses] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedClasses = JSON.parse(localStorage.getItem("myClasses") || "[]");
    const storedProgress = JSON.parse(localStorage.getItem("classProgress") || "{}");

    // Sinkronkan progress & certificateTaken dari classProgress
    const updatedClasses = storedClasses.map((cls: any) => {
      const prog = storedProgress[cls.id] || {};
      return {
        ...cls,
        progress: prog.progress ?? cls.progress ?? 0,
        certificateTaken: prog.certificateTaken ?? false,
      };
    });

    setMyClasses(updatedClasses);
  }, []);

  const handleContinue = (cls: any) => {
    localStorage.setItem("selectedClass", JSON.stringify(cls));
    navigate("/pretest-rules");
  };

  const handleDownloadCertificate = (cls: any) => {
    const classProgress = JSON.parse(localStorage.getItem("classProgress") || "{}");
    const data = classProgress[cls.id || "default"];
    if (!data || !data.certificateTaken) {
      alert("Sertifikat belum diambil. Silakan ambil sertifikat di halaman kelas (Congrats).");
      return;
    }

    // contoh: membuka file sertifikat statis atau generate (saat ini buka /certificate.pdf)
    // kamu bisa ganti dengan logic generate PDF nanti
    window.open("/certificate.pdf", "_blank");
  };

  const handleViewDetail = (cls: any) => {
    // navigasi ke halaman detail kelas — ganti rute sesuai implementasimu
    localStorage.setItem("selectedClass", JSON.stringify(cls));
    navigate("/detail-product/:id", { state: { classData: cls } });
  };

  return (
    <div><HeaderDashboard />
    <div className="min-h-screen bg-[#fffdf2] py-8 px-6 md:px-12">
      <h1 className="text-2xl font-bold mb-2">Kelas Saya</h1>
      <p className="text-gray-600 mb-6">
        Daftar kelas yang sudah kamu ikuti atau sedang berjalan.
      </p>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <SidebarMenu />
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-md p-6">
            {myClasses.length === 0 ? (
              <p className="text-gray-500">Belum ada kelas yang diikuti.</p>
            ) : (
              <ul className="space-y-6">
                {myClasses.map((item, index) => (
                  <li
                    key={index}
                    className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      {/* LEFT SIDE */}
                      <div className="flex gap-4 items-start">
                        <img
                          src={courseImage[item.courseImageIndex] || "/default-class.jpg"}
                          alt={item.classTitle}
                          className="w-32 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <h2 className="font-semibold text-gray-800 text-lg">
                            {item.classTitle}
                          </h2>
                          <div className="flex items-center gap-2 mt-1">
                            <img
                              src={avatarImage[item.avatarImageIndex] || "/default-avatar.jpg"}
                              alt={item.instructor}
                              className="w-6 h-6 rounded-full"
                            />
                            <p className="text-sm text-gray-500">{item.instructor}</p>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            {item.modules || 12} Modul • {item.minutes || 360} Menit
                          </p>
                        </div>
                      </div>

                      {/* STATUS */}
                      <div className="flex flex-col items-end">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full mb-2 ${
                            item.progress === 100
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {item.progress === 100 ? "Selesai" : "Sedang Berjalan"}
                        </span>
                      </div>
                    </div>

                    {/* PROGRESS + BUTTON */}
                    <div className="mt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      {/* PROGRESS BAR */}
                      <div className="w-full md:w-[70%]">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progres</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-2 ${
                              item.progress === 100 ? "bg-green-500" : "bg-yellow-500"
                            }`}
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* BUTTONS: jika selesai -> unduh + lihat detail */}
                      <div className="flex gap-2 justify-end">
                        {item.progress === 100 ? (
                          <>
                            <button
                              onClick={() => handleDownloadCertificate(item)}
                              className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition"
                            >
                            Unduh Sertifikat
                            </button>
                            <button
                              onClick={() => handleViewDetail(item)}
                              className="bg-white border border-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg transition"
                            >
                            Lihat Detail Kelas
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleContinue(item)}
                            className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg transition"
                          >
                            Lanjutkan Pembelajaran →
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
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

export default MyClass;
