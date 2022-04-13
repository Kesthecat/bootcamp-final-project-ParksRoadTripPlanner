import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Loading } from "./Loading";

export const PostedReviews = ({ hasNewReview, newReview }) => {
  const { id } = useParams();
  const [postedReviews, setPostedReviews] = useState([]);
  const [reviewsStatus, setReviewsStatus] = useState("idle"); // loaded, error

  useEffect(() => {
    setReviewsStatus("loading");
    fetch(`/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("reviews", data);
        if (data.data === null) {
          setPostedReviews("none");
          setReviewsStatus("loaded");
        } else {
          setPostedReviews(data.data);
          setReviewsStatus("loaded");
        }
      })
      .catch((error) => {
        console.log("loadReviewError", error.message);
      });
  }, []);

  if (reviewsStatus === "loading") return <Loading />;

  return (
    <ReviewsWrapper>
      {newReview && (
        <SingleReviewWrapper>
          <PostInfo>
            <p>{newReview.user}</p>
            <p>{newReview.time}</p>
          </PostInfo>
          <p>{newReview.review}</p>
        </SingleReviewWrapper>
      )}
      {reviewsStatus === "idle" && <div>No reviews yet.</div>}
      {postedReviews === "none" && <div>No reviews yet.</div>}
      {reviewsStatus === "error" && <div>Cannot load reviews.</div>}
      {postedReviews !== "none" &&
        postedReviews.map((review) => {
          return (
            <SingleReviewWrapper key={review._id}>
              <PostInfo>
                <p>{review.user}</p>
                <p>{review.time}</p>
              </PostInfo>
              <p>{review.review}</p>
            </SingleReviewWrapper>
          );
        })}
    </ReviewsWrapper>
  );
};

const ReviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px dotted blueviolet;
`;
const SingleReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid blueviolet;
`;
const PostInfo = styled.div``;
