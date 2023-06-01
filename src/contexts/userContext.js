import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import "./userContext.scss";

const userCtx = createContext();

const UserProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(undefined);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsub = auth.onAuthStateChanged((user) => {
      setCurrUser(user);
      setPending(false);
    });

    return () => {
      unsub();
    };
  }, []);

  if (pending) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center pt-5">
        <div className="lds-ripple mb-3">
          <div></div>
          <div></div>
        </div>
        <p className="fs-5">Loading...</p>
      </div>
    );
  }

  return (
    <userCtx.Provider
      value={{
        currUser,
      }}
    >
      {children}
    </userCtx.Provider>
  );
};

export { userCtx, UserProvider };
