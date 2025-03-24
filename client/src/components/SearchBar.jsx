import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/products/category/${search}`);
      setSearch("");
    }
  };
  return (
    <form type="submit" className="h-full w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        className="w-full h-full outline-none rounded-full px-7 bg-zinc-100 text-center"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
