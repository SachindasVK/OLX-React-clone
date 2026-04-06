import "./Navbar.css";
import logo from "../../assets/symbol.png";
import search from "../../assets/search1.svg";
import location from '../../assets/location.svg'
import arrow from "../../assets/arrow-down.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import addBtn from "../../assets/addButton.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleModal, toggleModalSell }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        toast.error(error.message || "Logout failed");
      });
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 z-50 w-full flex flex-wrap items-center gap-2 p-2 px-3 shadow-md bg-slate-100 border-b-4 border-white">
        <img onClick={()=>navigate('/')} src={logo} alt="logo" className="w-10 sm:w-12" />

        <div className="relative ml-2 sm:ml-5 w-[120px] sm:w-[180px] md:w-[250px]">
          <img src={location} alt="" className="absolute top-4 left-3.5 w-4 sm:w-5" />
          <input
            placeholder="Search city..."
            className="w-full p-2 sm:p-3 pl-8 sm:pl-9 pr-8 border-2 border-black rounded-md text-sm sm:text-base focus:outline-none focus:border-teal-300"
            type="text"
          />
          <img
            src={arrow}
            alt=""
            className="absolute top-3 right-2 w-4 sm:w-5 cursor-pointer"
          />
        </div>

        <div className="relative w-full order-3 sm:order-none sm:flex-1">
          <input
            placeholder="Find Cars, Mobile Phones, and More..."
            className="w-full p-2 sm:p-3 border-2 border-black rounded-md text-sm sm:text-base focus:outline-none focus:border-teal-300"
            type="text"
          />
          <div className="flex justify-center items-center absolute top-0 right-0 h-full w-10 sm:w-12 bg-[#002f34] rounded-e-md">
            <img className="w-4 sm:w-5 filter invert" src={search} alt="Search" />
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto">

          <div className="flex items-center gap-1 cursor-pointer">
            <p className="font-bold text-sm sm:text-base">EN</p>
            <img src={arrow} alt="" className="w-4" />
          </div>

          {!user ? (
            <p
              onClick={toggleModal}
              className="font-bold underline cursor-pointer text-sm sm:text-base"
              style={{ color: "#002f34" }}
            >
              Login
            </p>
          ) : (
            <div className="flex items-center gap-2">
              <p className="font-bold text-sm sm:text-base">
                {user.displayName?.split(" ")[0]}
              </p>
              <button
                onClick={handleLogout}
                className="underline text-sm sm:text-base"
                style={{ color: "#002f34" }}
              >
                Logout
              </button>
            </div>
          )}

          <img
            src={addBtn}
            onClick={user ? toggleModalSell : toggleModal}
            className="w-16 sm:w-20 md:w-24 rounded-full cursor-pointer shadow-md"
            alt="sell"
          />
        </div>
      </nav>

      <div className="w-full overflow-x-auto whitespace-nowrap flex shadow-md p-2 pt-20 px-4 sm:px-10">
        <ul className="flex items-center gap-4 text-sm sm:text-base">

          <div className="flex items-center gap-1 font-semibold uppercase">
            <p>All categories</p>
            <img className="w-4" src={arrow} alt="" />
          </div>

          <li>Cars</li>
          <li className="hidden sm:block">Motorcycles</li>
          <li>Mobile Phones</li>
          <li className="hidden md:block">For sale: Houses & Apartments</li>
          <li>Scooter</li>
          <li className="hidden lg:block">Commercial & Other Vehicles</li>
          <li className="hidden md:block">For rent: Houses & Apartments</li>

        </ul>
      </div>
    </div>
  );
};

export default Navbar;