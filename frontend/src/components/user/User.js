import { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { Loading } from "../Loading";
import avatar from "../../assets/000019.jpg";

export const User = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [userTrips, setUserTrips] = useState([]);
  const [isWaiting, setIsWaiting] = useState(true);
  const [delMsg, setDelMsg] = useState(null);
  const [clicked, setClicked] = useState(false);

  let history = useHistory();

  useEffect(() => {
    fetch(`/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== "success") {
          setIsWaiting(false);
          history.push("/Error");
          return;
        }
        setUserInfo(data.data);
        fetch(`/trips/user/${id}`)
          .then((res) => res.json())
          .then((data) => {
            // console.log("trips", data.data);
            setUserTrips(data.data);
            setIsWaiting(false);
          });
      })
      .catch((error) => {
        history.push("/Error");
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`/trip/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== "success") {
          setDelMsg(data.message);
          return;
        }
        setUserTrips(userTrips.filter((trip) => trip._id !== id));
      })
      .catch((error) => {
        // console.log(error.message);
        history.push("/Error");
      });
  };

  if (isWaiting) return <Loading />;

  return (
    <Container>
      <Container className="avatar">
        <Avatar
          src={avatar}
          alt="user's avatar"
          className={clicked ? "spin" : "noSpin"}
          onClick={() => setClicked(true)}
          onAnimationEnd={() => setClicked(false)}
        />
      </Container>
      <InfoContainer>
        <Container className="leftRight">
          <TopLeft>
            <Styledh2>{userInfo.username}</Styledh2>
            <StyledP>Joined: April 1, 2022</StyledP>
            <StyledP>Location: Montreal</StyledP>
          </TopLeft>
          <TopRight>
            <StyledP style={{ opacity: "0.5" }}>Manage Profile</StyledP>
          </TopRight>
        </Container>
        <BottomContainer>
          <Styledh2 className="trips">My Trips</Styledh2>
          <TripsContainer>
            <>
              {userTrips.length < 0 && <StyledP>No saved trip.</StyledP>}
              {userTrips.length > 0 &&
                userTrips.map((trip) => {
                  return (
                    <TripWrapper key={trip._id}>
                      <StyledNavLink to={`/trip/${trip._id}`}>
                        {trip.tripName}
                      </StyledNavLink>
                      <StyledBtn onClick={() => handleDelete(trip._id)}>
                        x
                      </StyledBtn>
                    </TripWrapper>
                  );
                })}
              {delMsg && <StyledP>{delMsg}</StyledP>}
            </>
          </TripsContainer>
        </BottomContainer>
      </InfoContainer>
    </Container>
  );
};

///animation
const rotate = keyframes`
from {
  transform: rotateY(0deg) scale(1.2);
}
to{
  transform: rotateY(360deg);
}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  &.avatar {
    align-items: center;
    margin-top: 25px;
  }
  &.leftRight {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 25px;
    padding: 0 55px;
  }
`;
const Avatar = styled.img`
  width: 300px;
  border-radius: 50%;
  border: 20px solid var(--color-secondary);
  margin-bottom: -100px;
  z-index: 10;
  transition: 0.3s;
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
  &.spin {
    animation: ${rotate} 1s;
  }
`;
const InfoContainer = styled.div`
  background-color: var(--color-secondary);
`;
const TopLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const TopRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const BottomContainer = styled.div`
  background-color: var(--color-tertiary);
  margin: 30px;
  padding-top: 15px;
`;
const TripsContainer = styled.div`
  margin: 25px 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 25px;
`;
const TripWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Styledh2 = styled.h2`
  margin: 15px 0;

  &.trips {
    margin-left: 15px;
  }
`;
const StyledP = styled.p``;
const StyledBtn = styled.button`
  margin-left: 35px;
  height: 30px;
  width: 30px;
`;
const StyledNavLink = styled(NavLink)``;
