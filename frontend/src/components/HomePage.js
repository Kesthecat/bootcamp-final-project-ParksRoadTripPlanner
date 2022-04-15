import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./hooks/userContext";

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
    <SignInForm onSubmit={(e) => handleSubmit(e)}>
      <Wrapper>
        <StyledLabel>Username:</StyledLabel>
        <StyledInput
          id="username"
          type="text"
          placeholder="Username"
          onChange={(e) => setInitialUsername(e.target.value)}
          required
        />
      </Wrapper>
      <Wrapper>
        <StyledLabel>
          Password
          <StyledInput
            id="password"
            type="password"
            placeholder="Case Sensitive"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </StyledLabel>
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
const StyledLabel = styled.label`
  font-family: var(--font-heading);
  font-size: 26px;
  color: var(--color-text);
`;
const StyledInput = styled.input``;
const StyledBtn = styled.button``;
