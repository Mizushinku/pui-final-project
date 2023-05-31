import React, { useContext } from "react";
import { NavLink, Navbar, NavbarBrand } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import { userContext } from "../../App";
import appRoutes from "../../shared/appRoutes";

import "./Navigation.scss";

const Navigation = () => {
  const { currUser } = useContext(userContext);

  return (
    <Navbar>
      <NavbarBrand
        className="fw-bold fs-3"
        tag={RouterNavLink}
        to={appRoutes.home}
      >
        AI Art Gallery
      </NavbarBrand>
      {currUser ? (
        currUser.displayName
      ) : (
        <NavLink
          className="d-flex align-items-center"
          tag={RouterNavLink}
          to={appRoutes.login}
        >
          <button id="btn-login" className="px-4 py-1">
            Login
          </button>
        </NavLink>
      )}
    </Navbar>
  );
};

export default Navigation;
