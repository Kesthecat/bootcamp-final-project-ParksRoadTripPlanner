import { useState } from "react";
import styled from "styled-components";

export const ReviewForm = ({ parkId }) => {
  const username = "thing1"; //will be according to the signed in user
  const [review, setReview] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);

  const handleChangeReview = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsWaiting(true);
  };

  return (
    <FormWrapper onSubmit={(e) => handleSubmit(e)}>
      <p>User: {username}</p>
      <StyledInput
        type="text"
        placeholder="What do you have to say?"
        required
        onChange={(e) => handleChangeReview(e)}
      />
      {/* add the word counter feature from twitter */}
      {isWaiting ? (
        <SubmitBtn type="submit" disabled={true}>
          LOADING
        </SubmitBtn>
      ) : (
        <SubmitBtn type="submit">Submit</SubmitBtn>
      )}
    </FormWrapper>
  );
};

const FormWrapper = styled.form``;
const StyledInput = styled.input``;
const SubmitBtn = styled.button``;
