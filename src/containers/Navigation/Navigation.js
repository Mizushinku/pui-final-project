import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import appRoutes from "../../shared/appRoutes";

const Navigation = () => {
  return (
    <Navbar>
      <NavbarBrand href={appRoutes.home}>AI Art Gallery</NavbarBrand>
    </Navbar>
  );
};

export default Navigation;
