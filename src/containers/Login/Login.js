import React, { useEffect } from "react";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import { getAuth } from "firebase/auth";
import appRoutes from "../../shared/appRoutes";
import { useNavigate } from "react-router";
import "firebaseui/dist/firebaseui.css";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start("#firebaseui-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult) {
          // Action if the user is authenticated successfully
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
      tosUrl: appRoutes.tos, // URL to you terms and conditions.
      privacyPolicyUrl: appRoutes.pp,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="bg-login" className="pt-5">
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default Login;
