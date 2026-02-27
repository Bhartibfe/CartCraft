import { useState, useEffect, useMemo } from "react";
import { fetchFromApi } from "../utils/fetchFromApi";
import { Products, Footer } from "../components/index";
import {
  PARENT_CATEGORIES,
  filterProductsByParentCategory,
  getParentCategoryByKey,
} from "../utils/categoryMapping";
import heroModel from "../assets/hero-model.png";
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
    <div className="bg-[#f6f7fb] min-h-screen">
      <section className="px-5 md:px-12 pt-10 md:pt-14 pb-6">
        {" "}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#f6c1cf] via-[#d9dff5] to-[#c5d4f5] px-8 md:px-14 py-8 md:py-0">
          {" "}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* LEFT CONTENT */}
            <div className="max-w-xl">
              <p className="text-xs tracking-[0.2em] uppercase text-gray-500">
                CartCraft Collection
              </p>

              <h1 className="text-4xl md:text-6xl font-extrabold mt-3 leading-tight text-gray-900">
                Curated picks for
                <br />
                everyday style
              </h1>

              <p className="mt-5 text-base text-gray-600">
                Discover fashion-forward pieces, curated collections, and
                seamless shopping designed for modern lifestyles.
              </p>

              <button
                className="mt-8 px-6 py-3 rounded-full bg-gray-900 text-white font-semibold hover:opacity-90 transition"
                onClick={() => {
                  setSelectedCategory("all");
                  document
                    .getElementById("products-list")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Shop Now
              </button>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative w-full md:w-[48%] flex justify-end pr-4 md:pr-0">
              {" "}
              <div
                className=" absolute px-6 md:px-8 w-[320px] h-[320px] md:w-[420px] md:h-[420px]
bg-[#ffd6df]
rounded-[60%_40%_50%_50%/60%_50%_50%_40%]
opacity-60
-translate-x-4 translate-y-4
z-0"
              ></div>
              <img
                src={heroModel}
                alt="Fashion Model"
                className="relative z-10 w-[300px] md:w-[400px] object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-12 py-4">
        <div className="flex flex-wrap gap-2 md:gap-3">
          <button
            className={`relative rounded-2xl px-6 py-3 flex items-center gap-3 transition-all duration-300 ${
              selectedCategory === "all"
                ? "bg-gradient-to-r from-pink-100 to-indigo-100 text-gray-700 shadow-lg scale-105"
                : "bg-white text-gray-800 border border-gray-200 hover:shadow-md hover:-translate-y-1"
            }`}
            onClick={() => setSelectedCategory("all")}
          >
            <span className="w-9 h-9 rounded-full bg-[color:var(--atmo-surface-soft)] flex items-center justify-center text-[10px] font-bold">
              All
            </span>
            <p className="capitalize text-xm font-semibold">All Products</p>
          </button>

          {PARENT_CATEGORIES.map((category) => (
            <button
              key={category.key}
              className={`relative rounded-2xl px-6 py-3 flex items-center gap-3 transition-all duration-300 ${
                selectedCategory === category.key
                  ? "bg-gradient-to-r from-pink-100 to-indigo-100 text-gray-700 shadow-lg scale-105"
                  : "bg-white text-gray-800 border border-gray-200 hover:shadow-md hover:-translate-y-1"
              }`}
              onClick={() => setSelectedCategory(category.key)}
            >
              {selectedCategory === category.key && (
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-300 to-indigo-300 blur-md opacity-40 -z-10"></span>
              )}

              <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center p-1">
                <img
                  src={category.image}
                  alt={category.label}
                  className="w-full h-full object-contain"
                />
              </span>

              <p className="text-xm font-semibold">{category.label}</p>
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
          className="px-4 py-2 rounded-xl border bg-[color:var(--atmo-surface-strong)] border-[color:var(--atmo-border-subtle)] text-[color:var(--atmo-text-soft)] disabled:opacity-50"
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
                  ? "bg-[color:var(--atmo-accent)] text-white border-[color:var(--atmo-accent)]"
                  : "bg-[color:var(--atmo-surface-strong)] text-[color:var(--atmo-text-soft)] border-[color:var(--atmo-border-subtle)]"
              }`}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          className="px-4 py-2 rounded-xl border bg-[color:var(--atmo-surface-strong)] border-[color:var(--atmo-border-subtle)] text-[color:var(--atmo-text-soft)] disabled:opacity-50"
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
