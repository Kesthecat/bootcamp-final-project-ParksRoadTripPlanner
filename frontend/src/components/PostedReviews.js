import { useEffect } from "react";
import styled from "styled-components";

export const PostedReviews = ({ id }) => {
  useEffect(() => {}, [id]);

  return (
    <ReviewsWrapper>
      <p>Review 1</p>
      <p>Review 2</p>
      <p>Review 3</p>
    </ReviewsWrapper>
  );
};

const ReviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
