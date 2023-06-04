import React, { useContext, useState } from "react";
import { userCtx } from "../../contexts/userContext";
import {
  Modal,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import ImageGallery from "../ImageGallery/ImageGallery";
// import ImagesInfo from "../../assets/ImagesInfo/ImagesInfo";
import "./UserPage.scss";
import { useNavigate } from "react-router-dom";
import appRoutes from "../../shared/appRoutes";

const UserPage = () => {
  const { currUser, myImages, myFavs } = useContext(userCtx);
  const [redirectModal, setRedirectModal] = useState(true);

  const [activeTab, setActiveTab] = useState("collection");

  const navigate = useNavigate();

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div>
      {currUser ? (
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
              <ImageGallery imgInfo={myFavs}></ImageGallery>
            </TabPane>
            <TabPane tabId="myimage">
              {/* MyImage 內容 */}
              <h1 className="fw-bold fs-1 text-center my-5">
                My Images Gallery
              </h1>
              <ImageGallery imgInfo={myImages}></ImageGallery>
            </TabPane>
          </TabContent>
        </div>
      ) : (
        <Modal
          isOpen={redirectModal}
          toggle={() => setRedirectModal((prev) => !prev)}
          centered
          onClosed={() => navigate(appRoutes.login)}
        >
          <ModalBody className="fw-bold fs-3">Please Login.</ModalBody>
        </Modal>
      )}
    </div>
  );
};

export default UserPage;
