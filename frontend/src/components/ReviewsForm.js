import { useState } from "react";
import styled from "styled-components";
import moment from "moment";

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

    fetch("/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: username,
        review: review,
        time: moment().format("LL"),
        parkId: parkId,
      }),
    });
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
