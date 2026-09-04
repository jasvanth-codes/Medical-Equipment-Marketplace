export const filterProducts = (
  products,
  search,
  category,
  sort
) => {

  let filtered = [...products];

  if (search) {
    filtered = filtered.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    filtered = filtered.filter(
      (item) => item.category === category
    );
  }

  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  if (sort === "name") {
    filtered.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  return filtered;
};