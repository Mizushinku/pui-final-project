import React, { useContext } from "react";
import { NavLink, Navbar, NavbarBrand } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import { userCtx } from "../../contexts/userContext";
import { getAuth, signOut } from "firebase/auth";

import appRoutes from "../../shared/appRoutes";

import "./Navigation.scss";

const Navigation = () => {
  const { currUser } = useContext(userCtx);
  const auth = getAuth();

  const handleLogout = () => {
    console.log("on Logout...");
    signOut(auth).then(() => {
      console.log("Logout success.");
    });
  };

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
        <div className="d-flex align-items-center">
          <button className="px-4 py-1" onClick={handleLogout}>
            Logout(W.I.P)
          </button>
        </div>
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
