import React, { useContext } from "react";
import { userCtx } from "../../contexts/userContext";
import { Container } from "reactstrap";
import "./UserPage.scss";

const UserPage = () => {
  const { currUser } = useContext(userCtx);

  return (
    <Container fluid>
      <h1>User Page</h1>
      <div className="d-flex align-items-center">
        <img
          src={currUser.photoURL}
          alt=""
          className="rounded-circle me-3"
          style={{ height: "40px" }}
        />
        <div className="fs-3">{currUser.displayName}</div>
      </div>
    </Container>
  );
};

export default UserPage;
