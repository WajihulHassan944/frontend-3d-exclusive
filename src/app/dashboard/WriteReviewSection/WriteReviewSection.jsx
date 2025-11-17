"use client";
import React from "react";
import { Star } from "lucide-react";
import "./WriteReviewSection.css"
import { useRouter } from "next/navigation";
const WriteReviewSection = () => {
    const router = useRouter();
  return (
    <div className="write-review-container">
      <div className="write-review-card">
        <Star className="star-icon" />
        <h2 className="write-review-title">Share Your Experience</h2>
        <p className="write-review-text">
          Help others by writing a review about your experience with our 3D video conversion service
        </p>
        <button className="write-review-btn" onClick={()=>router.push('/write-review')}>Write a Review</button>
      </div>
    </div>
  );
};

export default WriteReviewSection;
