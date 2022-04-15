import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { GiChecklist, GiLightBulb } from "react-icons/gi";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "./hooks/userContext";
import avatar from "../assets/000019.jpg";

export const Header = () => {
  const { username, setUsername, userId } = useContext(UserContext);

  const handleSignOut = () => {
    setUsername(null);
    localStorage.clear();
  };

  return (
    <Container>
      <LeftSide>
        <StyledNavLink to={"/mainMap"}>
          <MapIcon />
          <StyledP>Map</StyledP>
        </StyledNavLink>
        <StyledNavLink to={"/parks"}>
          <ListIcon />
          <StyledP>List of Parks</StyledP>
        </StyledNavLink>
        <StyledNavLink to={"/tripsSuggestions"}>
          <TripIcon />
          <StyledP>Trip suggestions</StyledP>
        </StyledNavLink>
      </LeftSide>
      {username ? (
        <RightSide>
          <StyledNavLink to={`/user/${userId}`}>
            <Avatar src={avatar} alt="user's avatar" />
            <StyledP>{username}</StyledP>
          </StyledNavLink>
          <StyledNavLink to={"/"} onClick={() => handleSignOut()}>
            Sign Out
          </StyledNavLink>
        </RightSide>
      ) : (
        <RightSide>
          <StyledNavLink to={"/"}>Sign In</StyledNavLink>
        </RightSide>
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 60px;
  background-color: var(--color-main);
  display: flex;
  justify-content: space-between;
`;
const LeftSide = styled.div`
  display: flex;
  gap: 20px;
`;
const StyledNavLink = styled(NavLink)`
  display: flex;
`;
const MapIcon = styled(FaMapMarkedAlt)``;
const ListIcon = styled(GiChecklist)``;
const TripIcon = styled(GiLightBulb)``;
const RightSide = styled.div`
  display: flex;
  gap: 20px;
`;
const StyledP = styled.p``;
const Avatar = styled.img`
  height: 40px;
  border-radius: 50%;
`;
