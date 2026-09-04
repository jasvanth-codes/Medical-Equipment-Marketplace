function SortDropdown({
  sort,
  setSort,
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <select
        value={sort}
        onChange={(e) =>
          setSort(e.target.value)
        }
      >
        <option value="">
          Sort Products
        </option>

        <option value="low">
          Price Low → High
        </option>

        <option value="high">
          Price High → Low
        </option>

        <option value="name">
          Name A → Z
        </option>
      </select>
    </div>
  );
}

export default SortDropdown;