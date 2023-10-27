"use client";
import Link from "next/link";
import React, { useState } from "react";

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks: string[] = ["", "excercises", "settings"];

  const openLinks = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className=" relative z-50">
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } min-h-[100vh] w-full bg-primary px-12 py-8 text-lg text-white shadow-xl transition-all duration-300 `}
      >
        <div className="mt-16 flex w-full flex-col items-center divide-y">
          {navLinks.map((link) => (
            <Link
              key={link}
              href={"/" + link}
              className="w-full py-4 text-center capitalize"
              onClick={() => setIsOpen(false)}
            >
              {link === "" ? "Home" : link}
            </Link>
          ))}
        </div>
      </div>

      <button className="absolute right-4 top-0 py-8 " onClick={() => openLinks()}>
        <svg height="70" width="50" className="stroke-white stroke-2 group-hover:stroke-secondary">
          <g>
            <path d={`${isOpen ? "M30 20 l20 20" : "M20 20 l30 0"}`} className="transition-all duration-700" />
            <path d={`${isOpen ? "M0 30 l0 0" : "M10 30 l40 0"}`} className="transition-all duration-700" />
            <path d={`${isOpen ? "M30 40 l20 -20" : "M0 40 l50 0"}`} className="transition-all duration-700" />
          </g>
        </svg>
      </button>
    </div>
  );
};

export default HamburgerMenu;
