import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";
import { Search, Filter, ChevronDown } from "lucide-react";
import menu from "../assets/menu.svg";

const Home = () => {
  const { products, loading, categories, selectedCategory, updateCategory } =
    useProducts();
  const [displayCount, setDisplayCount] = useState(8);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // Increase the number of displayed products when scrolling near the bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.body.offsetHeight;
      const scrollThreshold = pageHeight - 500;

      if (scrollPosition >= scrollThreshold && displayCount < products.length) {
        setDisplayCount((prevCount) =>
          Math.min(prevCount + 8, products.length),
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayCount, products.length]);

  // Reset display count when products change
  useEffect(() => {
    setDisplayCount(8);
  }, [products]);

  // Toggle category dropdown
  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    updateCategory(category);
    setIsCategoryDropdownOpen(false);
  };

  // Clear category filter
  const clearCategoryFilter = () => {
    updateCategory("");
    setIsCategoryDropdownOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Category tabs (desktop) */}
      <div className="hidden md:block mb-6  shadow-md w-full">
        <div className="flex items-center space-x-2 overflow-x-auto py-2 px-8">
          <button
            onClick={clearCategoryFilter}
            className={`w-auto flex items-center gap-3 px-4 py-2 rounded-full border border-gray-300 text-sm font-medium transition-colors ${"bg-blue-600 text-white"}`}
          >
            <img src={menu} alt="" className="text-black" /> ALL CATEGORIES
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`px-4 py-2 rounded-full border border-gray-300 text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "bg-gray-100 text-blue-700"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-3">
        {/* Category filter section (mobile) */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <button
              type="button"
              className="w-full flex items-center justify-between px-4 py-2 bg-white rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-olx-green"
              onClick={toggleCategoryDropdown}
            >
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <span>{selectedCategory || "All Categories"}</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </button>

            {isCategoryDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
                <div className="py-1">
                  <button
                    onClick={clearCategoryFilter}
                    className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-olx-light-grey"
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-olx-light-grey"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Products section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-black mb-4">
            {selectedCategory
              ? `${selectedCategory} Items`
              : "Fresh Recommendations"}
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-card overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-lg shadow-card p-8 text-center">
              <Search className="h-12 w-12 text-olx-dark-grey mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">
                No items found
              </h3>
              <p className="text-olx-dark-grey">
                {selectedCategory
                  ? `No items found in ${selectedCategory}. Try another category or check back later.`
                  : "No items found. Try a different search or check back later."}
              </p>
            </div>
          ) : (
            // product that are listed here
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.slice(0, displayCount).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Load more button */}
        {!loading && products.length > displayCount && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() =>
                setDisplayCount((prevCount) =>
                  Math.min(prevCount + 8, products.length),
                )
              }
              className="px-6 py-3 bg-white text-black border border-black rounded-md hover:bg-olx-light-grey focus:outline-none focus:ring-2 focus:ring-olx-green"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
