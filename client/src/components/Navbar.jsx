import { Link } from "react-router-dom";
import bglogin from "../assets/bg-img.png";
import avatar from "../assets/avatar.png";
import {
  FaCartShopping,
  IoHeartSharp,
  BiMenu,
  BiMenuAltRight,
} from "../utils/constants";
import { SearchBar, ProfileCard, Hamburger } from "./index";
import { CartContext } from "../context/CartContext";
import { useContext, useState, useRef, useEffect } from "react";
import { Badge } from "@mui/material";

const Navbar = () => {
  const { cart, wishlist } = useContext(CartContext);
  // theme toggling removed; always light mode
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const profileRef = useRef(null); // Ref for the profilecard div
  const avatarRef = useRef(null); // Ref for the avatar icon

  const handleShowProfileCard = () => {
    setShowProfile((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
  };

  const closeMenu = () => {
    setShowMobileMenu(false);
  };

  // Close the profile div when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        !avatarRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-0 bg-[#ffffffee] backdrop-blur-sm border-b border-gray-200 flex items-center justify-between w-full h-[70px] md:h-[80px] px-6 md:px-10 z-50">
      {" "}
      {/* Logo and Title */}
      <div className="w-[25%] h-full flex items-center justify-start md:justify-start font-semibold">
        <Link to={`/`}>
          <img
            src={bglogin}
            alt=""
            className="w-12 h-12 md:w-16 md:h-16 object-contain"
          />{" "}
        </Link>
        <Link to={`/`}>
          <p className="hidden md:block md:ml-3">Cart Craft</p>
        </Link>
      </div>
      {/* Search Bar */}
      <div className="w-[40%] h-[42px] md:h-[48px]">
        {" "}
        <SearchBar />
      </div>
      {/* Buttons on laptop */}
      <div className="hidden w-[25%] md:flex items-center justify-center md:justify-end gap-4 py-1 mr-4">
        <Link to={`/cart`}>
          <Badge className="rounded-full w-10 h-10 p-3 border border-gray-200 hover:bg-gray-100 transition relative">
            <FaCartShopping className="md:h-full md:w-full" />
            <span className="h-4 w-4 text-[10px] absolute -top-1 -right-2 flex items-center justify-center bg-purple-800 text-white rounded-full">
              {cart.length}
            </span>
          </Badge>
        </Link>
        <Link to={`/wishlist`}>
          <Badge className="rounded-full w-10 h-10 p-[9px] border border-gray-200 hover:bg-gray-100 transition relative">
            <IoHeartSharp className="w-full h-full" />
            <span className="h-4 w-4 text-[10px] absolute -top-1 -right-2 flex items-center justify-center bg-purple-800 text-white rounded-full">
              {wishlist.length}
            </span>
          </Badge>
        </Link>
        <button
          ref={avatarRef}
          className="rounded-full w-10 h-10 p-[9px] border border-gray-200 hover:bg-gray-100 transition"
          onClick={handleShowProfileCard}
        >
          {/* <FaUserCircle className='w-full h-full' /> */}
          <img src={avatar} alt="" />
        </button>
      </div>
      {/* Hamburger Menu on phone */}
      <div className="md:hidden w-[25%] flex items-center justify-end gap-3 transition-transform duration-300 ease-in-out">
        <button
          className="rounded-full w-7 h-7 transition-transform duration-300 ease-in-out"
          onClick={toggleMobileMenu}
        >
          {showMobileMenu ? (
            <BiMenuAltRight className="w-full h-full" />
          ) : (
            <BiMenu className="w-full h-full" />
          )}
        </button>
      </div>
      {showProfile && (
        <div ref={profileRef} className="">
          <ProfileCard />
        </div>
      )}
      {showMobileMenu && (
        <div>
          <div>
            <Hamburger closeMenu={closeMenu} />
          </div>

          {/* Overlay to close the menu when clicking outside */}
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={toggleMobileMenu}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
