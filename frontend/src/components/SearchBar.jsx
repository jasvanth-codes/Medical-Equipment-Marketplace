import {
  FaSearch,
  FaFilter,
  FaSortAmountDown,
} from "react-icons/fa";

import "./SearchBar.css";

function SearchBar({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
}) {
  return (
    <section className="search-section">
      <div className="search-container">

        <div className="search-wrapper">

          <div className="search-input-box">
            <FaSearch className="search-icon" />

            <input
              type="text"
              className="search-input"
              placeholder="Search medical equipment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="search-select-box">
            <FaFilter className="select-icon" />

            <select
              className="category-filter"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Diagnostics">Diagnostics</option>
              <option value="Monitoring">Monitoring</option>
              <option value="Respiratory Care">
                Respiratory Care
              </option>
              <option value="Mobility">Mobility</option>
              <option value="Hospital Equipment">
                Hospital Equipment
              </option>
              <option value="Surgical Supplies">
                Surgical Supplies
              </option>
              <option value="General">General</option>
            </select>
          </div>

          <div className="search-select-box">
            <FaSortAmountDown className="select-icon" />

            <select
              className="sort-dropdown"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="low">
                Price: Low to High
              </option>
              <option value="high">
                Price: High to Low
              </option>
              <option value="name">
                Name: A-Z
              </option>
            </select>
          </div>

        </div>

      </div>
    </section>
  );
}

export default SearchBar;
