import React, { useContext, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavLink,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import { NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import { userCtx } from "../../contexts/userContext";
import { getAuth, signOut } from "firebase/auth";

import appRoutes from "../../shared/appRoutes";

import "./Navigation.scss";

const Navigation = () => {
  const { currUser } = useContext(userCtx);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    console.log("on Logout...");
    signOut(auth).then(() => {
      console.log("Logout success.");
      navigate(appRoutes.home);
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
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
        <div className="d-flex align-items-center me-2">
          <NavLink
            className="d-flex align-items-center"
            tag={RouterNavLink}
            to={appRoutes.upload}
          >
            <button className="btn-black-white px-4 py-1 me-3">Upload</button>
          </NavLink>
          <Dropdown
            id="user-menu-dropdown"
            isOpen={isMenuOpen}
            toggle={toggleMenu}
          >
            <DropdownToggle tag="span">
              <div className="d-flex align-items-center">
                <img
                  className="rounded-circle"
                  src={currUser.photoURL}
                  alt=""
                />
              </div>
            </DropdownToggle>
            <DropdownMenu dark>
              <DropdownItem tag={RouterNavLink} to={appRoutes.userPage}>
                My Page
              </DropdownItem>
              <DropdownItem divider color="white" />
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      ) : (
        <NavLink
          className="d-flex align-items-center"
          tag={RouterNavLink}
          to={appRoutes.login}
        >
          <button className="btn-black-white px-4 py-1">Login</button>
        </NavLink>
      )}
    </Navbar>
  );
};

export default Navigation;
