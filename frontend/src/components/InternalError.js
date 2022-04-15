import lost from "../assets/map-what.gif";

export const InternalError = () => {
  return (
    <>
      <img src={lost} alt="lost looking at map" />
      <div>Internal error, please contact customer service.</div>;
    </>
  );
};
