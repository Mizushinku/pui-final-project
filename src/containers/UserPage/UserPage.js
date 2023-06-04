import React, { useContext, useState } from "react";
import { userCtx } from "../../contexts/userContext";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import ImageGallery from "../ImageGallery/ImageGallery";
// import ImagesInfo from "../../assets/ImagesInfo/ImagesInfo";
import "./UserPage.scss";

const UserPage = () => {
  const { myImages } = useContext(userCtx);

  const [activeTab, setActiveTab] = useState("collection");

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div>
      <Nav justified pills>
        <NavItem>
          <NavLink
            className={activeTab === "collection" ? "active" : ""}
            onClick={() => toggleTab("collection")}
          >
            Collection
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "myimage" ? "active" : ""}
            onClick={() => toggleTab("myimage")}
          >
            My Image
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="collection">
          {/* Collection 內容 */}
          <h1 className="fw-bold fs-1 text-center my-5">
            My Collections Gallery
          </h1>
          <ImageGallery imgInfo={[]}></ImageGallery>
        </TabPane>
        <TabPane tabId="myimage">
          {/* MyImage 內容 */}
          <h1 className="fw-bold fs-1 text-center my-5">My Images Gallery</h1>
          <ImageGallery imgInfo={myImages}></ImageGallery>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default UserPage;
