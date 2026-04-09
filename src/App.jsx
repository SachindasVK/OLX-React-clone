import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import { useProducts } from "./context/ProductContext";
import SellModal from "./components/SellModal";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import MyAds from "./pages/MyAds";

const App = () => {
  const { sellModalOpen, toggleSellModal } = useProducts();
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/my-ads" element={<MyAds />} />
          </Routes>
        </main>
        <Footer />
        <AuthModal />
        {sellModalOpen && <SellModal onClose={toggleSellModal} />}
      </div>
    </BrowserRouter>
  );
};

export default App;
