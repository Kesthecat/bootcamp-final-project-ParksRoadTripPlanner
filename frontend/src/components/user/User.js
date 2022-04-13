import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Loading } from "../Loading";

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
        fetch(`/trips/user/${id}`)
          .then((res) => res.json())
          .then((data) => {
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
      <div>User</div>
    </Container>
  );
};

const Container = styled.div``;
