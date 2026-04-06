import React from "react";
import mobilityfooter from "../../assets/mobilityfooter.svg";
import carwale from "../../assets/carwale.svg";
import Olxfooter from "../../assets/Olxfooter.svg";
import cartrade from "../../assets/cartrade.svg";
import cartrade_tech from "../../assets/cartrade_tech.svg";
import bikewale from "../../assets/bikewale.svg";
import appstore from "../../assets/social/appstore.webp";
import playstore from "../../assets/social/playstore.webp";
import fb from "../../assets/social/fb.svg";
import insta from "../../assets/social/insta.svg";
import linkdin from "../../assets/social/linkdin.svg";
import whatsapp from "../../assets/social/whatsapp.svg";
import x from "../../assets/social/x.svg";
import ytube from "../../assets/social/ytube.svg";

const Footer = () => {
  const footerDetails = [
    {
      title: "Popular Locations",
      items: ["Kolkata", "Mumbai", "Chennai", "Pune"],
    },
    {
      title: "Trending Locations",
      items: ["Bhubaneshwar", "Hyderabad", "Chandigarh", "Nashik"],
    },
    {
      title: "About us",
      items: ["About OLX India", "Tech@OLX", "Careers"],
    },
    {
      title: "OLX",
      items: [
        "Blog",
        "Help",
        "Sitemap",
        "Legal & Privacy information",
        "Vulnerability Disclosure Program",
      ],
    },
  ];

  return (
    <footer className="bg-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {footerDetails.map((section, index) => (
          <div key={index} className="border-0 shadow-none bg-gray-100">
            <div className="p-0">
              <h3 className="font-extrabold text-sm m-3">
                {section.title.toLocaleUpperCase()}
              </h3>

              <ul className="space-y-2 text-sm text-gray-500">
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="cursor-pointer hover:text-foreground transition text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div >
          <h3 className="font-extrabold text-sm mb-3">FOLLOW US</h3>

          <div className="flex gap-3 mb-4">
            {[fb, insta, linkdin, x, ytube, whatsapp].map((icon, i) => (
              <img
                key={i}
                src={icon}
                alt=""
                className="h-6 w-6 cursor-pointer opacity-80 hover:opacity-100 transition"
              />
            ))}
          </div>

          <div className="flex gap-2">
            <img
              src={playstore}
              alt=""
              className="h-8 object-contain cursor-pointer"
            />
            <img
              src={appstore}
              alt=""
              className="h-8 object-contain cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#0a3d8f] py-6 px-4 sm:px-10 text-white text-xs">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 sm:gap-24 mb-4">
          <img
            src={cartrade_tech}
            alt=""
            className="h-6 sm:h-16 object-contain"
          />

          <div className="hidden sm:block h-8 w-[1px] bg-white/40"></div>

          <img src={Olxfooter} alt="" className="h-6 sm:h-16 object-contain" />
          <img src={carwale} alt="" className="h-6 sm:h-16 object-contain" />
          <img src={bikewale} alt="" className="h-6 sm:h-16 object-contain" />
          <img src={cartrade} alt="" className="h-6 sm:h-16 object-contain" />
          <img
            src={mobilityfooter}
            alt=""
            className="h-6 sm:h-16 object-contain"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div>Help - Sitemap</div>

          <div className="whitespace-nowrap">
            All rights reserved © 2006-2026 OLX
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
