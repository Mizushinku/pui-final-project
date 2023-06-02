import React, { useEffect } from "react";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import { getAuth } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import appRoutes from "../../shared/appRoutes";
import { useNavigate } from "react-router";
import { db } from "../../index";
import "firebaseui/dist/firebaseui.css";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();

  async function initUserData(user) {
    const userCollection = "users";
    const docSnap = await getDoc(doc(db, userCollection, user.uid));
    if (!docSnap.exists()) {
      await setDoc(
        doc(db, userCollection, user.uid),
        { uploaded: [] },
        { merge: true }
      );
    }
    navigate(appRoutes.home);
  }

  useEffect(() => {
    const auth = getAuth();
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start("#firebaseui-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult) {
          // Action if the user is authenticated successfully
          initUserData(authResult.user);
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
