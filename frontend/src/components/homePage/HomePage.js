import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { UserContext } from "../hooks/userContext";
import { BottomPictures } from "./BottomPictures";
import { Title } from "./Title";
import { TopPictures } from "./TopPictures";

export const HomePage = () => {
  const { setUsername, setUserId } = useContext(UserContext);

  const [password, setPassword] = useState(null);
  const [initialUsername, setInitialUsername] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsWaiting(true);

    const username = initialUsername.toLowerCase();

    fetch(`/user/${username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data);
        if (data.message !== "success") {
          setError(true);
          setErrorMsg(data.message);
          setIsWaiting(false);
          return;
        }
        localStorage.setItem("user", data.data.username);
        localStorage.setItem("userId", data.data._id);
        const signedInUser = localStorage.getItem("user");
        const id = localStorage.getItem("userId");
        setUsername(signedInUser);
        setUserId(id);
        setIsWaiting(false);
        history.push("/parks");
      })
      .catch((error) => {
        // console.log("error", error.message);
        history.push("/Error");
      });
  };

  return (
    <Container>
      <TopPictures />
      <Container className="titleForm">
        <Title />
        <SignInForm onSubmit={(e) => handleSubmit(e)}>
          <InputWrapper>
            <StyledLabel>Username:</StyledLabel>
            <StyledInput
              id="username"
              type="text"
              placeholder="Username"
              onChange={(e) => setInitialUsername(e.target.value)}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <StyledLabel>Password:</StyledLabel>
            <StyledInput
              id="password"
              type="password"
              placeholder="Case Sensitive"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputWrapper>
          {isWaiting ? (
            <StyledBtn type="submit" disabled={true}>
              LOADING
            </StyledBtn>
          ) : (
            <StyledBtn type="submit">Sign In</StyledBtn>
          )}
          {error && <p>{errorMsg}</p>}
        </SignInForm>
      </Container>
      <BottomPictures />
    </Container>
  );
};

///animations
const fadeIn = keyframes`
from {
  opacity: 0;
}
to{
  opacity: 1;
}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  &.titleForm {
    flex-direction: row;
    align-items: center;
    gap: 150px;
    margin: 30px 0;
  }
`;

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  opacity: 0;
  animation: ${fadeIn} 1.5s ease-in forwards;
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledLabel = styled.label`
  font-family: var(--font-heading);
  font-size: 30px;
  color: var(--color-text);
`;
const StyledInput = styled.input`
  height: 25px;
  width: 250px;
  font-size: 20px;
  margin-left: 15px;
  padding-left: 5px;
  border-radius: 5px;
`;
const StyledBtn = styled.button`
  height: 35px;
  font-family: var(--font-heading);
  font-size: 25px;
  border-radius: 5px;
`;
