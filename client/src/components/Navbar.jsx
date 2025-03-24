import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
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
    <div className="flex items-center justify-between w-full h-[9vh] md:h-[11vh] py-2 md:py-3 px-4 md:px-8 z-50">
      {/* Logo and Title */}
      <div className="w-[25%] h-full flex items-center justify-start md:justify-start font-semibold">
        <Link to={`/`}>
          <img src={logo} alt="" className="w-7 h-8 md:w-10 md:h-11" />
        </Link>
        <Link to={`/`}>
          <p className="hidden md:block md:ml-3">Cart Craft</p>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="w-[50%] h-full p-1 rounded-full shadow-md">
        <SearchBar />
      </div>

      {/* Buttons on laptop */}
      <div className="hidden w-[25%] md:flex items-center justify-center md:justify-end gap-6 py-1 mr-6">
        <Link to={`/cart`}>
          <Badge className="rounded-full w-10 h-10 p-3 border border-gray-600 hover:bg-zinc-100 relative">
            <FaCartShopping className="md:h-full md:w-full" />
            <span className="h-4 w-4 text-[10px] absolute -top-1 -right-2 flex items-center justify-center bg-purple-800 text-white rounded-full">
              {cart.length}
            </span>
          </Badge>
        </Link>
        <Link to={`/wishlist`}>
          <Badge className="rounded-full w-10 h-10 p-[9px] border border-gray-600 hover:bg-zinc-100 relative">
            <IoHeartSharp className="w-full h-full" />
            <span className="h-4 w-4 text-[10px] absolute -top-1 -right-2 flex items-center justify-center bg-purple-800 text-white rounded-full">
              {wishlist.length}
            </span>
          </Badge>
        </Link>
        <button
          ref={avatarRef}
          className="rounded-full w-10 h-10 p-[9px] border border-gray-600 hover:bg-zinc-100"
          onClick={handleShowProfileCard}
        >
          {/* <FaUserCircle className='w-full h-full' /> */}
          <img src={avatar} alt="" />
        </button>
      </div>

      {/* Hamburger Menu on phone */}
      <div className="md:hidden w-[25%] flex justify-end transition-transform duration-300 ease-in-out">
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
