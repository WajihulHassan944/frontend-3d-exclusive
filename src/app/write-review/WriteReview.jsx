"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import "./WriteReview.css";
import { baseUrl } from "@/const"; 
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { refreshAndDispatchUser } from "@/utils/refreshUser";

const WriteReview = () => {
  const router = useRouter();
const user = useSelector((state) => state.user);
   const hasPendingReview = user?.invoices?.some(inv => inv.reviewGiven === false);
 const dispatch = useDispatch();
  
  const [name, setName] = useState("");
  const [roleOrProfession, setRoleOrProfession] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
 
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !roleOrProfession || !rating || !reviewText) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("roleOrProfession", roleOrProfession);
      formData.append("rating", rating);
      formData.append("reviewText", reviewText);
       formData.append("reviewTitle", reviewTitle);
      if (photo) formData.append("photo", photo);

      const res = await fetch(`${baseUrl}/reviews/add`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Review posted successfully!");
        router.push("/dashboard");
                await refreshAndDispatchUser(dispatch);
      } else {
        toast.error(data.message || "Failed to post review.");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.error("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="review-wrapper">
    {hasPendingReview ? (
      <>
        <h2 className="review-title">Write a Review</h2>

        <div className="review-offer">
          <strong>🎁 Special Offer!</strong>
          <div>
            Write a review and receive
            <span className="bonus-text"> 5 bonus credits</span> as a thank you!
          </div>
        </div>

        <form className="review-form" onSubmit={handleSubmit}>
          <label>Your Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Your Role/Profession</label>
          <input
            type="text"
            placeholder="Content Creator"
            value={roleOrProfession}
            onChange={(e) => setRoleOrProfession(e.target.value)}
          />

          <label>Review Title</label>
          <input
            type="text"
            placeholder="Review Title"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
          />

          <label>Rating</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= (hover || rating) ? "filled" : ""}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(rating)}
              >
                ★
              </span>
            ))}
          </div>

          <label>Your Review</label>
          <textarea
            placeholder="Tell us about your experience..."
            value={reviewText}
            maxLength={1000}
            onChange={(e) => {
              setReviewText(e.target.value);
              setCharCount(e.target.value.length);
            }}
          ></textarea>
          <div className="char-count">{charCount}/1000 characters</div>

          <label className="upload-label">Upload Photo (Optional)</label>
          <div className="custom-file-container">
            <input
              type="file"
              id="photo-upload"
              className="custom-file-input"
              accept="image/png, image/jpeg, image/webp"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
            <label htmlFor="photo-upload" className="custom-file-label">
              <span className="choose-file">Choose File</span>
              <span className="no-file">
                {photo ? photo.name : "No file chosen"}
              </span>
            </label>
          </div>
          <p className="file-note">
            Max file size: 5MB. Accepted formats: JPG, PNG, WEBP
          </p>

          <div className="button-row">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => router.push("/dashboard")}
            >
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </>
    ) : (
      <div className="no-review-allowed">
        <h2 className="review-title">Write a Review</h2>
        <p className="no-review-text">
          You’re not eligible to write a review right now.  
          Please place an order first to share your experience.
        </p>
        <Link href="/pricing" className="order-btn">
          Place an Order
        </Link>
      </div>
    )}
  </div>
);
};

export default WriteReview;
