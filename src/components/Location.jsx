import { useState, useRef, useEffect } from "react";
import { MapPin, ChevronRight } from "lucide-react";

const LocationSelector = () => {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("Kerala");
  const ref = useRef(null);

  const locations = [
    "Kerala",
    "Tamil Nadu",
    "Karnataka",
    "Delhi",
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-64" ref={ref}>
      
      {/* Input UI */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between bg-white border border-gray-300 px-4 py-3 rounded-full cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-800">
            {location}
          </span>
        </div>

        <ChevronRight className="h-5 w-5 text-gray-500" />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {locations.map((loc) => (
            <div
              key={loc}
              onClick={() => {
                setLocation(loc);
                setOpen(false);
              }}
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              {loc}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;