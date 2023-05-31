import { Route, Routes } from "react-router";
import "./App.css";
import Navigation from "./containers/Navigation/Navigation";
import appRoutes from "./shared/appRoutes";
import Home from "./containers/Home/Home";

function App() {
  return (
    <div>
      <Navigation></Navigation>
      <Routes>
        <Route path={appRoutes.home} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
