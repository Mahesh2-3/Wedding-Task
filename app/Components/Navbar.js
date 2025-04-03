"use client";
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsMenuOpen(false);
      }
      else {
        setIsMenuOpen(true);
      }
    }
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

  }, [])



  const handleClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="font-[family-name:var(--font-geist-sans)] bg-[#ffe550] px-7 relative h-[8vh] text-[#A0522D] flex justify-between items-center p-4">
      {/* Logo */}
      <div className="h-full flex gap-2 items-center text-4xl font-bold">
        <Image width={70} height={80} className="h-full scale-150 w-auto" src="/logo.png" alt="logo" />
        SV
      </div>

      {/* Navigation Menu */}
      <ul
        className="navList  w-fit bg-[#ffe550] px-5 sm:flex hidden flex-row  md:gap-8 gap-5 rounded-md duration-300 ">
        <li className="nav-item">
          <Link href="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link href="/About">About</Link>
        </li>
        <li className="nav-item">
          <Link href="/Services">Services</Link>
        </li>
        <li className="nav-item">
          <Link href="/Contact">Contact</Link>

        </li>
      </ul>
      <ul
        className={`navList z-50  w-fit absolute top-[68px] right-3 text-center sm:border-0 border-[1px] bg-[#ffe550] p-5  flex sm:hidden ${isMenuOpen ? "flex" : "hidden"} flex-col gap-2 rounded-md duration-300`}>
        <li onClick={handleClick} className="nav-item">
          <Link href="/">Home</Link>
        </li>
        <li onClick={handleClick} className="nav-item">
          <Link href="/About">About</Link>
        </li>
        <li onClick={handleClick} className="nav-item">
          <Link href="/Services">Services</Link>
        </li>
        <li onClick={handleClick} className="nav-item">
          <Link href="/Contact">Contact</Link>
        </li>
      </ul>



      <button onClick={handleClick} className="flex sm:hidden text-[#A0522D]">
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

    </nav>
  );
};

export default Navbar;
