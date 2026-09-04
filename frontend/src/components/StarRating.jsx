function StarRating({ rating = 0 }) {
  return (
    <div style={{ color: "#FFD700", fontSize: "20px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

export default StarRating;