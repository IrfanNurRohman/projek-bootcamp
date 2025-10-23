import { useNavigate, useLocation } from "react-router-dom";

const SidebarMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Kategori", path: "/all-products" },
    { label: "Profil Saya", path: "/profile" },
    { label: "Kelas Saya", path: "/my-class" },
    { label: "Pesanan Saya", path: "/order-history" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full md:w-1/4 h-auto">
      <ul className="text-sm text-gray-700">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`border-t border-gray-200 first:border-none py-3 cursor-pointer hover:text-yellow-600 transition ${
              location.pathname === item.path
                ? "text-yellow-600 font-semibold"
                : ""
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenu;
