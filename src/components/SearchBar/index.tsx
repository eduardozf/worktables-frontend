import { Search } from "monday-ui-react-core/next";
import { useToolbar } from "../../context/ToolbarContext";

const SearchBar = () => {
  const { handleSearch } = useToolbar();

  return (
    <Search
      placeholder="Enter a city name..."
      className="widthLg"
      onChange={(value) => handleSearch(value)}
    />
  );
};

export default SearchBar;
