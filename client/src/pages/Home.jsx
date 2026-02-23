import { useState, useEffect, useMemo } from "react";
import { fetchFromApi } from "../utils/fetchFromApi";
import { Products, Footer } from "../components/index";
import {
  PARENT_CATEGORIES,
  filterProductsByParentCategory,
  getParentCategoryByKey,
} from "../utils/categoryMapping";

const ITEMS_PER_PAGE = 12;

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const productsRes = await fetchFromApi("products?limit=200");

        setAllProducts(productsRes?.products || []);
      } catch (error) {
        console.error("Error loading home data:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filteredProducts = useMemo(() => {
    return filterProductsByParentCategory(allProducts, selectedCategory);
  }, [allProducts, selectedCategory]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)),
    [filteredProducts.length],
  );

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <div className="bg-[#f4f6fb]">
      <section className="px-5 md:px-12 pt-6 md:pt-10 pb-6">
        <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#102a43] via-[#1f4e79] to-[#2d6cdf] p-6 md:p-10 text-white">
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-orange-200">
            CartCraft Collection
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-2 leading-tight">
            Curated picks for
            <br /> everyday style
          </h1>
          <p className="mt-4 text-sm md:text-base text-zinc-100 max-w-xl">
            Browse products with faster filters, better search, and a clean
            shopping flow.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              className="px-5 py-2 rounded-full bg-white text-[#102a43] font-semibold hover:opacity-90"
              onClick={() => {
                setSelectedCategory("all");
                const listSection = document.getElementById("products-list");
                listSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-12 py-4">
        <div className="flex flex-wrap gap-2 md:gap-3">
          <button
            className={`rounded-xl px-3 py-2 border shadow-sm flex items-center gap-2 transition ${
              selectedCategory === "all"
                ? "bg-[#102a43] text-white border-[#102a43]"
                : "bg-white text-zinc-700 border-zinc-200 hover:-translate-y-1"
            }`}
            onClick={() => setSelectedCategory("all")}
          >
            <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
              All
            </span>
            <p className="capitalize text-xs font-semibold">
              All Products
            </p>
          </button>

          {PARENT_CATEGORIES.map((category) => (
            <button
              key={category.key}
              className={`rounded-xl px-3 py-2 border shadow-sm flex items-center gap-2 transition ${
                selectedCategory === category.key
                  ? "bg-[#102a43] text-white border-[#102a43]"
                  : "bg-white text-zinc-700 border-zinc-200 hover:-translate-y-1"
              }`}
              onClick={() => setSelectedCategory(category.key)}
            >
              <span className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center p-1">
                <img
                  src={category.image}
                  alt={category.label}
                  className="w-full h-full object-contain"
                />
              </span>
              <p className="capitalize text-xs font-semibold">
                {category.label}
              </p>
            </button>
          ))}
        </div>
      </section>

      <div id="products-list">
        <Products
          title={
            selectedCategory === "all"
              ? "All Products"
              : `Category: ${getParentCategoryByKey(selectedCategory)?.label || selectedCategory}`
          }
          products={loading ? [] : paginatedProducts}
        />
      </div>

      <section className="px-5 md:px-12 py-8 flex items-center justify-center gap-2 md:gap-3 flex-wrap">
        <button
          className="px-4 py-2 rounded-xl border bg-white border-zinc-300 text-zinc-700 disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              className={`px-4 py-2 rounded-xl border text-sm font-semibold ${
                currentPage === pageNumber
                  ? "bg-[#102a43] text-white border-[#102a43]"
                  : "bg-white text-zinc-700 border-zinc-300"
              }`}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          className="px-4 py-2 rounded-xl border bg-white border-zinc-300 text-zinc-700 disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
