import { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useContext } from "react";
import { UserContext } from "./hooks/userContext";
import { useHistory } from "react-router-dom";
const CHAR_LIMIT = 150;

export const ReviewForm = ({ parkId, setHasNewReview, setNewReview }) => {
  const { username } = useContext(UserContext);
  const [review, setReview] = useState(null);
  const [overLimit, setOverLimit] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  let history = useHistory();

  const handleChangeReview = (e) => {
    setReview(e.target.value);
    e.target.value.length > CHAR_LIMIT
      ? setOverLimit(true)
      : setOverLimit(false);
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
          setIsWaiting(false);
          history.push("/Error");
        } else {
          setHasNewReview(true);
          setNewReview(data.data);
          setIsWaiting(false);
          setReview("");
        }
      })
      .catch((error) => {
        // console.log("error", error);
        history.push("/Error");
      });
  };

  return (
    <FormWrapper onSubmit={(e) => handleSubmit(e)}>
      {!username ? (
        <p>Sign In to leave a review.</p>
      ) : (
        <>
          <p>
            <span style={{ fontWeight: "bold" }}>Username: </span>
            {username}
          </p>
          <StyledInput
            type="text"
            placeholder="What do you have to say?"
            required
            value={review}
            onChange={(e) => handleChangeReview(e)}
          />
          <StyledP>{CHAR_LIMIT - (review?.length || 0)}</StyledP>
          {isWaiting ? (
            <SubmitBtn type="submit" disabled={true}>
              LOADING
            </SubmitBtn>
          ) : (
            <SubmitBtn type="submit" disabled={overLimit}>
              Submit
            </SubmitBtn>
          )}
        </>
      )}
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 5px;
  margin-top: 15px;
`;
const StyledInput = styled.input`
  width: 1000px;
  height: 30px;
  font-size: 20px;
  padding-left: 5px;
`;
const StyledP = styled.p`
  /* color: ; */
  margin-left: 975px;
`;
const SubmitBtn = styled.button`
  width: 100px;
  height: 30px;
  font-size: 20px;
  margin-left: 911px;
  background-color: ${(props) =>
    props.disabled ? "var(--color-tertiary)" : "var(--color-main)"};
`;
