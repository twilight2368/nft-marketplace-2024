import React, { createContext, useState, useContext } from "react";

const LoginContext = createContext();

const LoginProvider = (props) => {
  const [login, setLogin] = useState(false);
  const [userID, setUserID] = useState();

  return (
    <>
      <LoginContext.Provider value={{ login, setLogin, userID, setUserID }}>
        {props.children}
      </LoginContext.Provider>
    </>
  );
};

const useLoginContext = () => {
  return useContext(LoginContext);
};

export { LoginProvider, useLoginContext };
