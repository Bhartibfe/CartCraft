import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";

// eslint-disable-next-line react/prop-types
const Hamburger = ({ closeMenu }) => {
  return (
    <div className="w-[60vw] fixed top-16 right-0 z-50 flex flex-col gap-2 p-4 text-zinc-300 rounded-lg bg-gradient-to-t from-black to-[#323238]">
      <div className="flex flex-col gap-2">
        <Link to={`/`} onClick={closeMenu}>
          <p>Home</p>
        </Link>
        <Link to={`/cart`} onClick={closeMenu}>
          <p>My Cart</p>
        </Link>
        <Link to={`/wishlist`} onClick={closeMenu}>
          <p>My Wishlist</p>
        </Link>
      </div>
      <div>
        <ProfileCard />
      </div>
    </div>
  );
};

export default Hamburger;
