import { useState } from "react";
import styled from "styled-components";
import moment from "moment";

export const ReviewForm = ({ parkId, setHasNewReview, setNewReview }) => {
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
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== "success") {
          window.alert(
            "An error has occur, cannot post review. Refresh the page."
          );
        } else {
          setHasNewReview(true);
          setNewReview(data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
        window.alert(
          "An error has occur, cannot post review. Refresh the page."
        );
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
