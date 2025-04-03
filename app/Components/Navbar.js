"use client";
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
   if (window.innerWidth < 640) {
      setIsMenuOpen(false);
    }
    else {
    setIsMenuOpen(true);
   }
  }, [])
  
 

  const handleClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-[#ffe550] px-7 relative h-[8vh] text-[#A0522D] flex justify-between items-center p-4">
      {/* Logo */}
      <div className="h-full flex gap-2 items-center text-4xl font-bold">
        <img className="h-full scale-150 w-auto" src="logo.png" alt="" />
        SV
      </div>

      {/* Navigation Menu */}
      <ul
        className="navList  w-fit bg-[#ffe550] px-5 sm:flex hidden flex-row  md:gap-8 gap-5 rounded-md duration-300 ">
        <li className="nav-item">
          <a href="/">Home</a>
        </li>
        <li className="nav-item">
          <a href="/About">About</a>
        </li>
        <li className="nav-item">
          <a href="/Services">Services</a>
        </li>
        <li className="nav-item">
          <a href="/Contact">Contact</a>
        </li>
      </ul>
      <ul
        className={`navList  w-fit absolute top-[68px] right-3 sm:border-0 border-[1px] bg-[#ffe550] p-5  flex sm:hidden ${  isMenuOpen?  "flex":"hidden"} flex-col gap-2 rounded-md duration-300`}>
        <li className="nav-item">
          <a href="/">Home</a>
        </li>
        <li className="nav-item">
          <a href="/About">About</a>
        </li>
        <li className="nav-item">
          <a href="/Services">Services</a>
        </li>
        <li className="nav-item">
          <a href="/Contact">Contact</a>
        </li>
      </ul>

   

        <button onClick={handleClick} className="flex sm:hidden text-[#A0522D]">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
    
    </nav>
  );
};

export default Navbar;
