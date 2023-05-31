import { Route, Routes } from "react-router";
import "./App.css";
import Navigation from "./containers/Navigation/Navigation";
import appRoutes from "./shared/appRoutes";
import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import UploadImage from "./containers/Upload/Upload";

function App() {
  return (
    <div>
      <Navigation></Navigation>
      <Routes>
        <Route path={appRoutes.home} element={<Home />} />
        <Route path={appRoutes.login} element={<Login />} />
        <Route path={appRoutes.upload} element={<UploadImage />} />
      </Routes>
    </div>
  );
}

export default App;
