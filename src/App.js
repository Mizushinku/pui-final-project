import { Route, Routes } from "react-router";
import "./App.css";
import Navigation from "./containers/Navigation/Navigation";
import appRoutes from "./shared/appRoutes";
import Home from "./containers/Home/Home";
import UploadImage from "./containers/Upload/Upload";
import { Button } from "reactstrap";

function App() {
  return (
    <div>
      <Navigation></Navigation>
      <Routes>
        <Route path={appRoutes.home} element={<Home />} />
        <Route path={appRoutes.upload} element={<UploadImage />} />
      </Routes>
      <Button href={appRoutes.upload}>upload</Button>
    </div>
  );
}

export default App;
