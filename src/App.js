import React from "react";
import { Route, Routes } from "react-router";
import { UserProvider } from "./contexts/userContext";
import "./App.css";
import Navigation from "./containers/Navigation/Navigation";
import appRoutes from "./shared/appRoutes";
import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import UploadImage from "./containers/Upload/Upload";
import ToS from "./containers/Login/ToS";
import PrivacyPolicy from "./containers/Login/PrivacyPolicy";

// export const userContext = createContext();

function App() {
  // const [currUser, setCurrUser] = useState(undefined);
  return (
    <div className="d-flex fluid flex-column h-100">
      {/* <userContext.Provider value={{ currUser, setCurrUser }}> */}
      <UserProvider>
        <Navigation></Navigation>
        <Routes>
          <Route path={appRoutes.home} element={<Home />} />
          <Route path={appRoutes.login} element={<Login />} />
          <Route path={appRoutes.upload} element={<UploadImage />} />
          <Route path={appRoutes.tos} element={<ToS />} />
          <Route path={appRoutes.pp} element={<PrivacyPolicy />} />
        </Routes>
      </UserProvider>

      {/* </userContext.Provider> */}
    </div>
  );
}

export default App;
