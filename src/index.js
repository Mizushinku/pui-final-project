import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const firebaseConfig = {
  apiKey: "AIzaSyB0VZSs-yGOsEadSCobN-1HVWC2wvc0B5k",
  authDomain: "pui-final-3bc90.firebaseapp.com",
  projectId: "pui-final-3bc90",
  storageBucket: "pui-final-3bc90.appspot.com",
  messagingSenderId: "409645965181",
  appId: "1:409645965181:web:409643afc790f5f002f614",
  measurementId: "G-5FNZMDDR0K",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

export { firebaseApp, db, storage };
