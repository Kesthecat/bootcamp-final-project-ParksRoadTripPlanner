import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export const HomePage = ({ setIsSignedIn, setUser }) => {
  const [password, setPassword] = useState(null);
  const [initialUsername, setInitialUsername] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsWaiting(true);
    console.log(initialUsername);

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
        if (data.message !== "success") {
          setError(true);
          setErrorMsg(data.message);
        }
        setUser(data.data);
        setIsSignedIn(true);
        history.push("/mainMap");
      })
      .catch((error) => {
        console.log("error", error.message);
        // history.push("/internalError");
        // window.alert(error.message);
      });
  };

  return (
    <SignInForm onSubmit={(e) => handleSubmit(e)}>
      <Wrapper>
        <StyledLabel for="username">Username:</StyledLabel>
        <StyledInput
          id="username"
          type="text"
          placeholder="Username"
          onChange={(e) => setInitialUsername(e.target.value)}
        />
      </Wrapper>
      <Wrapper>
        <StyledLabel for="password">Password</StyledLabel>
        <StyledInput
          id="password"
          type="password"
          placeholder="Case Sensitive"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Wrapper>
      {isWaiting ? (
        <StyledBtn type="submit" disabled={true}>
          LOADING
        </StyledBtn>
      ) : (
        <StyledBtn type="submit">Sign In</StyledBtn>
      )}
      {error && <p>{errorMsg}</p>}
    </SignInForm>
  );
};

const SignInForm = styled.form``;
const Wrapper = styled.div``;
const StyledLabel = styled.label``;
const StyledInput = styled.input``;
const StyledBtn = styled.button``;
