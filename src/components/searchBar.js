import "./searchbar.css";

const SearchBar = ({ searchText, handleSearch }) => {
  return (
    <div className="search-bar">
      <input
        className="form-control"
        type="search"
        placeholder="Search for name, email or role"
        aria-label="Search"
        value={searchText}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
