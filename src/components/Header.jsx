import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import {
  Search,
  Heart,
  Menu,
  X,
  LogOut,
  User,
  HeartIcon,
  LogOutIcon,
} from "lucide-react";
import addButton from "../assets/addButton.png";
import LocationSelector from "./Location";

const Header = () => {
  const { currentUser, openAuthModal } = useAuth();
  const { updateSearchQuery, toggleSellModal, searchQuery } = useProducts();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  const userMenuRef = useRef(null);
  const categoryMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(event.target)
      ) {
        setCategoryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateSearchQuery(searchTerm);
  };

  const handleSellClick = () => {
    currentUser ? toggleSellModal() : openAuthModal("login");
  };

  return (
    <header className="bg-olx-light-grey shadow-nav sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://statics.olx.in/external/base/img/olxLogo/olx_logo_2025.svg"
              alt="OLX Logo"
              className="h-12 md:h-14"
            />
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>

          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between flex-1 ml-4 gap-4 flex-wrap">
            {/* Category */}
            <div className="relative">
              <LocationSelector />
            </div>

            {/* Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex-1 w-full max-w-xl"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Find Cars, Mobile Phones and more..."
                  className="text-sm w-full py-2 md:py-3 pl-5 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-olx-green"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded-full"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="flex flex-col items-center text-xs"
              >
                <Heart className="h-5 w-5 mb-1" />
                <span className="hidden lg:block">Wishlist</span>
              </Link>

              {/* User */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() =>
                    currentUser
                      ? setUserMenuOpen(!userMenuOpen)
                      : openAuthModal("login")
                  }
                  className="flex flex-col items-center text-xs"
                >
                  <User className="h-5 w-5 mb-1" />
                  <span className="hidden lg:block">
                    {currentUser ? currentUser.email.split("@")[0] : "Login"}
                  </span>
                </button>

                {userMenuOpen && currentUser && (
                  <div className="absolute right-0 mt-2 w-44 text-sm bg-white shadow-lg rounded-md">
                    <Link
                      to="/my-ads"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      My Ads
                    </Link>
                    <Link
                      to="/wishlist"
                      className="block flex items-center px-4 py-2 hover:bg-gray-100"
                    >
                      Wishlist
                    </Link>
                    <button
                      onClick={() =>
                        import("../service/firebase").then(({ logoutUser }) =>
                          logoutUser(),
                        )
                      }
                      className="w-full flex  items-center text-left px-4 py-2 hover:bg-gray-100"
                    >
                      <LogOutIcon className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Sell */}
              <button
                onClick={handleSellClick}
                className="flex items-center justify-center px-2 py-1"
              >
                <img
                  src={addButton}
                  alt="sell"
                  className="h-8 md:h-10 lg:h-12"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 space-y-3">
            <form onSubmit={handleSearchSubmit}>
              <input
                placeholder="Find Cars, Mobile Phones and more..."
                className="w-full p-2 border rounded text-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>

            <Link
              to="/wishlist"
              className="flex items-center px-3 py-2 text-sm font-medium text-black rounded-md hover:bg-olx-light-gray"
            >
              <HeartIcon className="h-5 w-5 mr-2" /> Wishlist
            </Link>

            {currentUser ? (
              <>
                <Link
                  to="/my-ads"
                  className="flex items-center px-3 py-2 text-sm font-medium text-black rounded-md hover:bg-olx-light-grey"
                >
                  <User className="h-5 w-5 mr-2" />
                  My Ads
                </Link>
                <button
                  onClick={() => {
                    import("../service/firebase").then(({ logoutUser }) =>
                      logoutUser(),
                    );
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-black rounded-md hover:bg-olx-light-grey"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <button
                  type="button"
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-black rounded-md hover:bg-olx-light-grey"
                  onClick={() => {
                    openAuthModal('login');
                    setMobileMenuOpen(false);
                  }}
                >
                  <User className="h-5 w-5 mr-2" />
                  Login
                </button>
            )}

            <button onClick={handleSellClick}>
              <img src={addButton} className="h-10" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
