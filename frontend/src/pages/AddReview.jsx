import { useState } from "react";
import { addReview } from "../services/reviewService";

function AddReview({ productId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await addReview({
        product: productId,
        rating,
        comment,
      });

      alert("Review Added");

      setComment("");
      setRating(5);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h3>Write Review</h3>

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        <option value={5}>5</option>
        <option value={4}>4</option>
        <option value={3}>3</option>
        <option value={2}>2</option>
        <option value={1}>1</option>
      </select>

      <br /><br />

      <textarea
        rows="4"
        cols="40"
        placeholder="Write Review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <br /><br />

      <button type="submit">Submit Review</button>
    </form>
  );
}

export default AddReview;