import "./FilterSidebar.css";

function FilterSidebar({
  category,
  setCategory,
}) {
  return (
    <div className="filter-sidebar">
      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option value="All">
          All Categories
        </option>

        <option value="Diagnostics">
          Diagnostics
        </option>

        <option value="Monitoring">
          Monitoring
        </option>

        <option value="Respiratory">
          Respiratory
        </option>

        <option value="Diabetes Care">
          Diabetes Care
        </option>

        <option value="Surgical">
          Surgical
        </option>
      </select>
    </div>
  );
}

export default FilterSidebar;