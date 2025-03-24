import { Link } from "react-router-dom";
import { FaGithub, FaLinkedinIn, HiMail } from "../utils/constants";
import { useAuth } from "../context/Auth";

const Footer = () => {
  const { signOut } = useAuth();

  return (
    <div className="w-full h-[35vh] md:h-[30vh] mt-5 bg-black text-white flex flex-col items-center justify-center">
      <div className="w-[75%] gap-4 md:gap-0 flex flex-col md:flex-row items-center justify-between text-sm mb-6">
        <div className="order-2 md:order-1 flex items-center justify-center gap-6 text-zinc-300">
          <Link to="/">
            <p>Products</p>
          </Link>
          <Link to="/">
            <p>Categories</p>
          </Link>
          <Link to="/">
            <p>Contact</p>
          </Link>
        </div>
        <div className="order-1 py-4 md:py-0 md:order-2 flex flex-col items-center">
          <Link to="/">
            <h1 className="font-bold text-xl">CartCraft</h1>
          </Link>
          <p className="text-xs text-zinc-400">Best Shopping Experience</p>
        </div>
        <div className="order-3 flex items-center justify-center gap-4 text-zinc-300">
          {/* <Link to='/'><p>SignUp</p></Link> */}
          {/* <Link to='/'><p className='mr-2'>Login</p></Link> */}
          <button className="mr-2" onClick={signOut}>
            Logout
          </button>
          <Link to="https://github.com/SandhyaSharmaaa" target="blank">
            <FaGithub className="text-lg" />
          </Link>
          <Link
            to="https://www.linkedin.com/in/sandhya-sharmaaa/"
            target="blank"
          >
            <FaLinkedinIn className="text-lg" />
          </Link>
          <Link to="mailto:sharmasandhya95185@gmail.com" target="blank">
            <HiMail className="text-lg" />
          </Link>
        </div>
      </div>
      <div className="w-[85%] md:w-[75%] text-xs text-zinc-500 flex items-center justify-between">
        <p className="w-[30%] md:w-[20%]">Copyright ©️ 2025 CartCraft</p>
        {/* <hr size="2" width="60%" color='red'></hr> */}
        <div className="w-[42%] md:w-[65%] border-b-[1px] border-zinc-700"></div>
        <p className="w-[20%] md:w-[15%] text-end">Designed by Sandhya</p>
      </div>
    </div>
  );
};

export default Footer;
