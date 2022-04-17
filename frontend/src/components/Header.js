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
          <StyledH3>Map</StyledH3>
        </StyledNavLink>
        <StyledNavLink to={"/parks"}>
          <ListIcon />
          <StyledH3>List of Parks</StyledH3>
        </StyledNavLink>
        <StyledNavLink to={"/tripsSuggestions"}>
          <TripIcon />
          <StyledH3>Trip suggestions</StyledH3>
        </StyledNavLink>
      </LeftSide>
      {username ? (
        <RightSide>
          <StyledNavLink to={`/user/${userId}`}>
            <Avatar src={avatar} alt="user's avatar" />
            <StyledH3>{username}</StyledH3>
          </StyledNavLink>
          <StyledNavLink to={"/"} onClick={() => handleSignOut()}>
            <StyledH3>Sign Out</StyledH3>
          </StyledNavLink>
        </RightSide>
      ) : (
        <RightSide>
          <StyledNavLink to={"/"}>
            <StyledH3>Sign In</StyledH3>
          </StyledNavLink>
        </RightSide>
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 100px;
  background-color: var(--color-main);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
`;
const LeftSide = styled.div`
  display: flex;
  gap: 40px;
`;
const StyledNavLink = styled(NavLink)`
  display: flex;
`;
const MapIcon = styled(FaMapMarkedAlt)`
  transform: scale(2);
  margin-right: 10px;
`;
const ListIcon = styled(GiChecklist)`
  transform: scale(2);
`;
const TripIcon = styled(GiLightBulb)`
  transform: scale(2);
`;
const RightSide = styled.div`
  display: flex;
  gap: 40px;
`;
const StyledH3 = styled.h3`
  margin-left: 10px;
`;
const Avatar = styled.img`
  height: 40px;
  border-radius: 50%;
`;
