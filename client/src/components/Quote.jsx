import { BiSolidQuoteLeft, BiSolidQuoteRight } from "../utils/constants";

const Quote = () => {
  return (
    <div className="h-[30vh] mt-12 md:mt-0 flex flex-col md:flex-row items-center justify-center">
      <BiSolidQuoteLeft className="h-32 w-32 text-gray-400" />
      <p className="text-xl mx-7 font-bold tracking-normal md:tracking-wide [word-spacing:7px] text-center">
        Where innovation meets convenience — your style is just a click away.
      </p>
      <BiSolidQuoteRight className="h-32 w-32 text-gray-400" />
    </div>
  );
};

export default Quote;
