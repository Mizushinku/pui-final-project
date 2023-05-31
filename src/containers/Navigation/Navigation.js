import React from "react";
import { NavLink, Navbar, NavbarBrand } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import appRoutes from "../../shared/appRoutes";

import "./Navigation.scss";

const Navigation = () => {
  return (
    <Navbar>
      <NavbarBrand
        className="fw-bold fs-3"
        tag={RouterNavLink}
        to={appRoutes.home}
      >
        AI Art Gallery
      </NavbarBrand>
      <NavLink
        className="d-flex align-items-center"
        tag={RouterNavLink}
        to={appRoutes.login}
      >
        <button id="btn-login" className="px-4 py-1">
          Login
        </button>
      </NavLink>
    </Navbar>
  );
};

export default Navigation;
