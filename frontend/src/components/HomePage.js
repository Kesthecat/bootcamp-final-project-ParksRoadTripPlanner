import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./hooks/userContext";

export const HomePage = () => {
  const { setUsername, setUserId, setUserInfo } = useContext(UserContext);

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
        if (data.message !== "success") {
          setError(true);
          setErrorMsg(data.message);
        }
        localStorage.setItem("user", data.data.username);
        localStorage.setItem("userId", data.data._id);
        const signedInUser = localStorage.getItem("user");
        const id = localStorage.getItem("userId");
        setUsername(signedInUser);
        setUserId(id);
        setUserInfo(data.data);
        setIsWaiting(false);
        history.push("/parks");
      })
      .catch((error) => {
        console.log("error", error.message);
        // history.push("/internalError");
        window.alert(error.message);
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
const StyledLabel = styled.label``;
const StyledInput = styled.input``;
const StyledBtn = styled.button``;
