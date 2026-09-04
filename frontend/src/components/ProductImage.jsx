function ProductImage({ image }) {
  return (
    <img
      src={
        image ||
        "https://via.placeholder.com/300"
      }
      alt="Product"
      width="300"
    />
  );
}

export default ProductImage;