import './searchBar.css';
import { Search} from "@mui/icons-material"
import {InputAdornment,TextField} from "@mui/material";

const SearchBar = ({searchText, handleSearch}) => {

    return(
      <div>
      <TextField
        className="search-desktop"
        size="large"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        value={searchText}
        onChange={handleSearch}
      />
      
    </div>
    );
};

export default SearchBar;


