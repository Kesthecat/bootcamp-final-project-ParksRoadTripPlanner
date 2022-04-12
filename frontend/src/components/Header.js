import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { GiChecklist, GiLightBulb } from "react-icons/gi";

export const Header = ({ isSignedIn, setIsSignedIn, user, setUser }) => {
  const handleSignOut = () => {
    setIsSignedIn(false);
    setUser(null);
  };

  return (
    <Container>
      <LeftSide>
        <IconTitleWrapper>
          <StyledNavLink to={"/parks"}>
            <ListIcon />
            <StyledP>List of Parks</StyledP>
          </StyledNavLink>
        </IconTitleWrapper>
        <IconTitleWrapper>
          <StyledNavLink to={"/tripsSuggestions"}>
            <TripIcon />
            <StyledP>Trip suggestions</StyledP>
          </StyledNavLink>
        </IconTitleWrapper>
      </LeftSide>
      {isSignedIn && (
        <RightSide>
          <StyledNavLink to={`/user/${user.id}`}>
            <Avatar src="../assets/000019.jpg" alt="user's avatar" />
            <StyledP>{user.username}</StyledP>
          </StyledNavLink>
          <StyledNavLink to={"/"} onCLick={() => handleSignOut()}>
            Sign Out
          </StyledNavLink>
        </RightSide>
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 60px;
  background-color: rgb(245, 203, 61);
  display: flex;
  justify-content: space-between;
`;
const LeftSide = styled.div`
  display: flex;
  gap: 20px;
`;
const IconTitleWrapper = styled.div`
  display: flex;
`;
const StyledNavLink = styled(NavLink)``;
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
