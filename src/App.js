import "./App.css";
import ImageTrack from "./containers/ImageTrack/ImageTrack";
import ImagePopup from "./containers/ImagePopup/ImagePopup.js";
import ImageUploader from "./containers/Upload/Upload";

function App() {
  return (
    <div>
      <h1>PUI Final Project</h1>
      <ImageTrack></ImageTrack>
      <ImagePopup></ImagePopup>
      <ImageUploader></ImageUploader>
    </div>
  );
}

export default App;
