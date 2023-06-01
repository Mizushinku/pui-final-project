import React, { useContext, useEffect } from "react";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import { firebaseApp } from "../../index";
import { getAuth } from "firebase/auth";
import appRoutes from "../../shared/appRoutes";
import { useNavigate } from "react-router";
import { userContext } from "../../App";
import "firebaseui/dist/firebaseui.css";
import "./Login.scss";

const Login = () => {
  const { setCurrUser } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start("#firebaseui-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult) {
          // Action if the user is authenticated successfully
          setCurrUser(authResult.user);
          navigate(appRoutes.home);
        },
        uiShown: function () {
          // This is what should happen when the form is full loaded. In this example, I hide the loader element.
        },
      },
      signInFlow: "popup",
      signInOptions: [
        // This array contains all the ways an user can authenticate in your application. For this example, is only by email.
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        },
      ],
      tosUrl: appRoutes.home, // URL to you terms and conditions.
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="bg-login">
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default Login;
