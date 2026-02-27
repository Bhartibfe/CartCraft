import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFromApi } from "../utils/fetchFromApi";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const query = search.trim();
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const data = await fetchFromApi(
          `products/search?q=${encodeURIComponent(query)}`,
        );
        setSuggestions((data?.products || []).slice(0, 6));
      } catch (error) {
        setSuggestions([]);
      }
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = search.trim();
    if (value) {
      navigate(`/products/category/${encodeURIComponent(value)}`);
      setSearch("");
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (productId) => {
    navigate(`/products/${productId}`);
    setSearch("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div ref={wrapperRef} className="h-full w-full relative">
      <form type="submit" className="h-full w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search products or categories..."
          className="w-full h-full outline-none rounded-xl px-4 bg-gray-100 border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-indigo-300 transition"
          value={search}
          onFocus={() => setShowSuggestions(true)}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-[110%] left-0 right-0 bg-white border border-gray-200 shadow-lg rounded-2xl border-[color:var(--atmo-border-subtle)] overflow-hidden z-50">
          {suggestions.map((item) => (
            <button
              key={item.id}
              type="button"
              className="w-full px-4 py-3 text-left hover:bg-[rgba(148,163,184,0.12)] flex items-center gap-3"
              onClick={() => selectSuggestion(item.id)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-8 h-8 object-cover rounded-lg bg-[color:var(--atmo-surface-soft)]"
              />
              <span className="text-sm text-[color:var(--atmo-text-soft)] overflow-hidden whitespace-nowrap text-ellipsis">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
