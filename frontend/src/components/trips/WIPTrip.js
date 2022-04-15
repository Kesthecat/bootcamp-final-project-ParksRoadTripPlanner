return (
    //   <Container>
    //     <TripName>{trip.tripName}</TripName>
    //     <InfoContainer>
    //       <Wrapper className="Route">
    //         <table>
    //           <thead>
    //             <th></th>
    //             <th>Distance</th>
    //             <th>Driving time</th>
    //           </thead>
    //           <tbody>
    //             <tr>
    //               <td>Departure: {trip.departure.name}</td>
    //               <td></td>
    //               <td></td>
    //             </tr>
    //             <tr>
    //               <td></td>
    //               <td>{trip.routeMetrics[0].distance.text}</td>
    //               <td>{trip.routeMetrics[0].duration.text}</td>
    //             </tr>
    //             {hasStops &&
    //               waypoints.map((leg, i) => {
    //                 return (
    //                   <>
    //                     <tr key={leg._id}>
    //                       <td>
    //                         Waypoint {i + 1}: {trip.waypoints[i]}
    //                       </td>
    //                       <td></td>
    //                       <td></td>
    //                     </tr>
    //                     <tr>
    //                       <td></td>
    //                       <td>{trip.routeMetrics[i + 1].distance.text}</td>
    //                       <td>{trip.routeMetrics[i + 1].duration.text}</td>
    //                     </tr>
    //                   </>
    //                 );
    //               })}
    //             <tr>
    //               <td>Destination: {trip.destination.name}</td>
    //               <td></td>
    //               <td></td>
    //             </tr>
    //           </tbody>
    //         </table>
    //         {/* <InfoWrapper>
    //           <StyledP>Departure: </StyledP>
    //           <StyledP>{trip.departure.name}</StyledP>
    //         </InfoWrapper>
    //         {hasStops &&
    //           waypoints.map((waypoint, i) => {
    //             return (
    //               <InfoWrapper key={waypoint._id}>
    //                 <StyledP>Stop {i + 1}: </StyledP>
    //                 <ParkLink to={`/parks/${waypoint._id}`}>
    //                   {waypoint.name}
    //                 </ParkLink>
    //               </InfoWrapper>
    //             );
    //           })}
    //         <InfoWrapper>
    //           <StyledP>Destination: </StyledP>
    //           <StyledP>{trip.destination.name}</StyledP>
    //         </InfoWrapper>
    //       </Wrapper>
    //       <Wrapper className="Driving">
    //         <InfoWrapper>
    //           <StyledP>Total Distance: </StyledP>
    //           <StyledP>distance according to route rendered...</StyledP>
    //         </InfoWrapper>
    //         <InfoWrapper>
    //           <StyledP>Driving duration: </StyledP>
    //           <StyledP>driving time according to route</StyledP>
    //         </InfoWrapper> */}
    //       </Wrapper>
    //       <Wrapper className="Buttons">
    //         <StyledBtn>Edit trip btn</StyledBtn>
    //         <StyledBtn>Delete trip btn</StyledBtn>
    //         <StyledBtn>Share trip btn</StyledBtn>
    //       </Wrapper>
    //     </InfoContainer>
    //     <MapContainer>
    //       {/* <GoogleMapReact
    //         bootstrapURLKeys={bootstrapURLKeys}
    //         defaultCenter={{ lat: 51.90994, lng: -100.50986 }}
    //         defaultZoom={4}
    //         yesIWantToUseGoogleMapApiInternals
    //         onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
    //       >
    //         {waypoints.map((waypoint, i) => {
    //           return (
    //             <LocationMarker
    //               key={i}
    //               lat={waypoint.coordinates.lat}
    //               lng={waypoint.coordinates.lng}
    //               park={waypoint}
    //             />
    //           );
    //         })}
    //       </GoogleMapReact> */}
    //     </MapContainer>
    //   </Container>
    // );
    // };