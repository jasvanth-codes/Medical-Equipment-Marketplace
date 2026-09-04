import { useEffect, useState } from "react";
import { getReviews } from "../services/reviewService";
import StarRating from "./StarRating";

function ReviewSection({ productId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const res = await getReviews(productId);
      setReviews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Customer Reviews</h2>

      {reviews.length === 0 && <p>No Reviews Yet</p>}

      {reviews.map((review) => (
        <div
          key={review._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        >
          <h4>{review.user?.name}</h4>

          <StarRating rating={review.rating} />

          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewSection;