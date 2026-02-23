import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromApi } from "../utils/fetchFromApi";
import { ProductCard } from "../components/index";

const SearchResults = () => {
  const { category } = useParams();
  const [searchResult, setSearchResult] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const run = async () => {
      const rawQuery = decodeURIComponent(category || "").trim();
      const slugQuery = rawQuery.toLowerCase().replace(/\s+/g, "-");

      try {
        const categoryResponse = await fetchFromApi(
          `products/category/${encodeURIComponent(slugQuery)}`
        );
        const categoryProducts = categoryResponse?.products || [];

        if (categoryProducts.length) {
          setTitle(`Showing category: ${slugQuery}`);
          setSearchResult(categoryProducts);
          return;
        }
      } catch (error) {
        // Fall through to text search
      }

      const searchResponse = await fetchFromApi(
        `products/search?q=${encodeURIComponent(rawQuery)}`
      );
      const searchedProducts = searchResponse?.products || [];
      setTitle(`Search results for: ${rawQuery}`);
      setSearchResult(searchedProducts);
    };

    run();
  }, [category]);

  return (
    <div className="py-7">
      <h1 className="font-semibold text-base md:text-lg mb-3 text-gray-700 px-8">
        {title || "Showing results"}
      </h1>
      <div className="flex flex-row items-center justify-center gap-4 md:gap-8 flex-wrap">
        {searchResult.map((item) => (
          <div
            key={item.id}
            className="bg-white flex flex-col items-start h-[28vh] w-[40%] rounded-lg md:w-[20%] md:h-[70vh]"
          >
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
