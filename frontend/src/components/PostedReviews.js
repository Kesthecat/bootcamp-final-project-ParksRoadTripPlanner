import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

export const PostedReviews = ({ newReview }) => {
  const { id } = useParams();
  const [postedReviews, setPostedReviews] = useState([]);
  const [reviewsStatus, setReviewsStatus] = useState("idle"); // loaded, error
  let history = useHistory();

  useEffect(() => {
    setReviewsStatus("loading");
    fetch(`/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== "success") {
          setReviewsStatus("idle");
          history.push("/Error");
        } else if (data.data === null) {
          setReviewsStatus("loaded");
        } else {
          const reviewlist = data.data;
          const revervedList = reviewlist.reverse();
          setPostedReviews(revervedList);
          setReviewsStatus("loaded");
        }
      })
      .catch((error) => {
        // console.log("loadReviewError", error.message);
        history.push("/Error");
      });
  }, [newReview]);

  if (reviewsStatus === "loading") return <p>Loading ...</p>;

  return (
    <ReviewsWrapper>
      {reviewsStatus === "idle" && <p>No reviews yet.</p>}
      {postedReviews.length === 0 && !newReview && <p>No reviews yet.</p>}
      {reviewsStatus === "error" && <p>Cannot load reviews.</p>}
      {postedReviews.length > 0 &&
        postedReviews.map((review) => {
          return (
            <SingleReviewWrapper key={review._id}>
              <PostInfo>
                <p style={{ fontWeight: "bolder" }}>{review.user}</p>
                <p style={{ fontSizeSize: "15px" }}>{review.time}</p>
              </PostInfo>
              <div style={{ overflowWrap: "break-word" }}>
                <p style={{ fontWeight: "100" }}>{review.review}</p>
              </div>
            </SingleReviewWrapper>
          );
        })}
    </ReviewsWrapper>
  );
};

const ReviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 2px solid var(--color-secondary);
  margin-top: 15px;
  margin-left: 5px;
`;
const SingleReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  border-top: 2px solid var(--color-tertiary);
  margin-top: 10px;
  width: 1000px;
`;
const PostInfo = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 10px;
`;
