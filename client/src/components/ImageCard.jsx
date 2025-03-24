import { FaArrowRight } from "../utils/constants";
import hero_img from "../assets/img_2.jpg";
import Button from "@mui/material/Button";

const ImageCard = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center px-8 my-12 w-full h-[55vh] md:h-[40vh] md:px-28 md:my-16">
      <img
        src={hero_img}
        className="h-[40%] w-full md:h-full md:w-[45%] rounded-t-lg md:rounded-l-lg"
      />
      <div className="h-[60%] w-full md:h-full md:w-[55%] flex flex-col items-start justify-center px-8 md:px-14 bg-gray-800 rounded-b-lg md:rounded-r-lg">
        <p className="font-semibold text-gray-400">LIMITED OFFER</p>
        <h1 className="font-bold text-lg md:text-3xl text-white mt-3">
          30% off on this Raksha Bandhan and a special gift
        </h1>
        {/* <button className="w-[80%] md:w-1/3 mt-4 md:mt-8 font-semibold flex items-center justify-center gap-3 py-3 rounded-lg bg-white text-gray-800 outline-none hover:bg-gray-200 duration-300">
          <p>Grab it now</p>
          <FaArrowRight />
        </button> */}
        <Button
          variant="contained"
          className="!bg-white  !text-gray-800 !font-semibold !mt-4 !md:mt-8 !flex !items-center !justify-center !gap-3 !py-3"
        >
          Grab it now
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default ImageCard;
