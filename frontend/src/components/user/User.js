import { useEffect, useState } from "react";
import { GiConsoleController } from "react-icons/gi";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Loading } from "../Loading";
// import avatar from "/assets/000019.jpg";

export const User = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [userTrips, setUserTrips] = useState([]);
  const [isWaiting, setIsWaiting] = useState(true);

  useEffect(() => {
    fetch(`/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.data);
        console.log("userInfo", data.data);
        fetch(`/trips/user/${id}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("trips", data.data);
            setUserTrips(data.data);
            setIsWaiting(false);
          });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }, []);

  if (isWaiting) return <Loading />;

  return (
    <Container>
      <Avatar alt="user's avatar" />
      <InfoContainer>
        <TopLeft>
          <Styledh2>{userInfo.uername}</Styledh2>
          <StyledP>Name: John Doe</StyledP>
          <StyledP>Joined: April 1, 2022</StyledP>
          <StyledP>Location: Montreal</StyledP>
        </TopLeft>
        <TopRight>Manage Profile</TopRight>
        <TripsContainer></TripsContainer>
      </InfoContainer>
    </Container>
  );
};

const Container = styled.div``;
const Avatar = styled.img``;
const InfoContainer = styled.div``;
const TopLeft = styled.div``;
const TopRight = styled.div``;
const TripsContainer = styled.div``;
const Styledh2 = styled.h2``;
const StyledP = styled.p``;
