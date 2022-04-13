import { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useContext } from "react";
import { UserContext } from "./hooks/userContext";

export const ReviewForm = ({ parkId, setHasNewReview, setNewReview }) => {
  const { username } = useContext(UserContext);

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
          window.alert(data.message);
        } else {
          setHasNewReview(true);
          setNewReview(data.data);
          setIsWaiting(false);
          setReview("");
        }
      })
      .catch((error) => {
        console.log("error", error);
        window.alert(error.message);
      });
  };

  return (
    <FormWrapper onSubmit={(e) => handleSubmit(e)}>
      {!username ? (
        <p>Sign In to leave a review.</p>
      ) : (
        <>
          <p>User: {username}</p>
          <StyledInput
            type="text"
            placeholder="What do you have to say?"
            required
            value={review}
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
        </>
      )}
    </FormWrapper>
  );
};

const FormWrapper = styled.form``;
const StyledInput = styled.input``;
const SubmitBtn = styled.button``;
