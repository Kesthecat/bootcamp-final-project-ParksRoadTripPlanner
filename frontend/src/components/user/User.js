import { useEffect, useState } from "react";
import { GiConsoleController } from "react-icons/gi";
import { NavLink, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import { Loading } from "../Loading";
import avatar from "../../assets/000019.jpg";

export const User = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [userTrips, setUserTrips] = useState([]);
  const [isWaiting, setIsWaiting] = useState(true);
  // const [isDeleted, setIsDeleted] = useState(false);
  const [delMsg, setDelMsg] = useState(null);

  let history = useHistory();

  useEffect(() => {
    fetch(`/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== "success") {
          history.push("/Error");
        }
        setUserInfo(data.data);
        // console.log("userInfo", data.data);
        fetch(`/trips/user/${id}`)
          .then((res) => res.json())
          .then((data) => {
            // console.log("trips", data.data);
            setUserTrips(data.data);
            setIsWaiting(false);
          });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }, []);

  const handleDelete = (id) => {
    // setDelStatus("loading");

    fetch(`/trip/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // setDelStatus("res");
        if (data.message !== "success") {
          setDelMsg(data.message);
          return;
        }
        setUserTrips(userTrips.filter((trip) => trip._id !== id));
      });
  };

  if (isWaiting) return <Loading />;

  return (
    <Container>
      <Avatar src={avatar} alt="user's avatar" />
      <InfoContainer>
        <TopLeft>
          <Styledh2>{userInfo.uername}</Styledh2>
          <StyledP>Name: John Doe</StyledP>
          <StyledP>Joined: April 1, 2022</StyledP>
          <StyledP>Location: Montreal</StyledP>
        </TopLeft>
        <TopRight>Manage Profile</TopRight>
        <BottomContainer>
          <Styledh2>My Trips</Styledh2>
          <TripsContainer>
            <>
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

const Container = styled.div`
  border: 2px solid red;
`;
const Avatar = styled.img`
  height: 400px;
`;
const InfoContainer = styled.div`
  border: 2px dotted dodgerblue;
`;
const TopLeft = styled.div`
  border: 2px dotted green;
`;
const TopRight = styled.div`
  border: 2px dotted turquoise;
`;
const BottomContainer = styled.div`
  border: 2px dotted black;
`;
const TripsContainer = styled.div`
  border: 2px solid black;
`;
const TripWrapper = styled.div`
  border: 2px solid rebeccapurple;
`;
const Styledh2 = styled.h2``;
const StyledP = styled.p``;
const StyledBtn = styled.button``;
const StyledNavLink = styled(NavLink)``;
