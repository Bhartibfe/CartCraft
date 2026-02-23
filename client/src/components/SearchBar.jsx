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
        const data = await fetchFromApi(`products/search?q=${encodeURIComponent(query)}`);
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
          className="w-full h-full outline-none rounded-full px-6 bg-zinc-100 text-sm md:text-base"
          value={search}
          onFocus={() => setShowSuggestions(true)}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-[110%] left-0 right-0 bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden z-50">
          {suggestions.map((item) => (
            <button
              key={item.id}
              type="button"
              className="w-full px-4 py-3 text-left hover:bg-zinc-100 flex items-center gap-3"
              onClick={() => selectSuggestion(item.id)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-8 h-8 object-cover rounded-lg bg-zinc-100"
              />
              <span className="text-sm text-zinc-700 overflow-hidden whitespace-nowrap text-ellipsis">
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
