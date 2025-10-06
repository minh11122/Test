import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  X,
  User,
  ChevronDown,
  Heart,
  Clock,
  LogOut,
} from "lucide-react";
import logo from "../../../assets/z7061145888588_5c8d81483fa297d0582373ac66f727a4.jpg";

export const HeaderHome = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // ❌ xoá token
    setShowUserMenu(false);
    navigate("/"); // quay về trang chủ
    window.location.reload(); // ✅ reload để cập nhật header ngay lập tức
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      setShowUserMenu(!showUserMenu);
    } else {
      navigate("/auth/login"); // 👉 đi thẳng vào trang login
    }
  };

  return (
    <>
      <header className="w-full px-6 py-4 bg-white border-b border-yellow-200 shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center shadow-md overflow-hidden">
              <img
                src={logo}
                alt="MyMapFood Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <Link
              to="/"
              className="text-2xl font-bold text-gray-900 transition-colors"
            >
              MyMap<span className="text-yellow-500">Food</span>
            </Link>
          </div>

          {/* Search trigger */}
          <div
            onClick={() => setOpenSearch(true)}
            className="flex items-center gap-2 w-full max-w-md px-4 py-2 border border-yellow-300 rounded-full bg-white hover:shadow-md transition cursor-pointer"
          >
            <Search className="w-5 h-5 text-gray-500" />
            <span className="text-gray-500">Tìm món ăn hoặc nhà hàng</span>
          </div>

          {/* User button */}
          <div className="relative">
            <button
              onClick={handleLoginClick}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-full shadow-md transition-all duration-300"
            >
              <User className="w-4 h-4" />
              <span>{isLoggedIn ? "Tài khoản" : "Đăng nhập"}</span>
              {isLoggedIn && <ChevronDown className="w-4 h-4" />}
            </button>

            {/* Hiện menu nếu đã đăng nhập */}
            {isLoggedIn && showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <Link
                  to="/profile"
                  className="w-full px-4 py-3 text-left text-sm hover:bg-yellow-50 flex items-center gap-3 transition"
                  onClick={() => setShowUserMenu(false)}
                >
                  <User className="w-5 h-5 text-yellow-500" />
                  <div>
                    <div className="font-medium text-gray-900">Profile</div>
                    <div className="text-xs text-gray-500">
                      Thông tin cá nhân
                    </div>
                  </div>
                </Link>

                <Link
                  to="/favorites"
                  className="w-full px-4 py-3 text-left text-sm hover:bg-yellow-50 flex items-center gap-3 transition"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Heart className="w-5 h-5 text-yellow-500" />
                  <div>
                    <div className="font-medium text-gray-900">
                      Nhà hàng yêu thích
                    </div>
                    <div className="text-xs text-gray-500">
                      Danh sách yêu thích
                    </div>
                  </div>
                </Link>

                <Link
                  to="/orderhistory"
                  className="w-full px-4 py-3 text-left text-sm hover:bg-yellow-50 flex items-center gap-3 transition"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Clock className="w-5 h-5 text-yellow-500" />
                  <div>
                    <div className="font-medium text-gray-900">
                      Lịch sử mua hàng
                    </div>
                    <div className="text-xs text-gray-500">Đơn hàng đã đặt</div>
                  </div>
                </Link>

                <hr className="my-2" />

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-yellow-50 flex items-center gap-3 transition"
                >
                  <LogOut className="w-5 h-5 text-yellow-500" />
                  <div>
                    <div className="font-medium text-gray-900">Đăng xuất</div>
                    <div className="text-xs text-gray-500">Thoát tài khoản</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Overlay search giữ nguyên */}
      {openSearch && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start pt-20 z-50">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-4 relative">
            <button
              onClick={() => setOpenSearch(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm món ăn hoặc nhà hàng"
                className="w-full outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
