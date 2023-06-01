import { Route, Routes } from "react-router";
import "./App.css";
import Navigation from "./containers/Navigation/Navigation";
import appRoutes from "./shared/appRoutes";
import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import UploadImage from "./containers/Upload/Upload";
import ToS from "./containers/Login/ToS";
import PrivacyPolicy from "./containers/Login/PrivacyPolicy";
import { createContext, useState } from "react";

export const userContext = createContext();

function App() {
  const [currUser, setCurrUser] = useState(undefined);
  return (
    <div className="d-flex fluid flex-column h-100">
      <userContext.Provider value={{ currUser, setCurrUser }}>
        <Navigation></Navigation>
        <Routes>
          <Route path={appRoutes.home} element={<Home />} />
          <Route path={appRoutes.login} element={<Login />} />
          <Route path={appRoutes.upload} element={<UploadImage />} />
          <Route path={appRoutes.tos} element={<ToS />} />
          <Route path={appRoutes.pp} element={<PrivacyPolicy />} />
        </Routes>
      </userContext.Provider>
    </div>
  );
}

export default App;
