import React, { createContext, useState, useContext, useEffect } from "react";

const LoginContext = createContext();

const LoginProvider = (props) => {
  const [login, setLogin] = useState(false);
  const [userID, setUserID] = useState();
  const [username, setUsername] = useState();
  const [accountname, setAccountname] = useState();

  useEffect(() => {
    if (localStorage.getItem("login-marketplace-ffnft") === "true") {
      setLogin(true);
      setUsername(localStorage.getItem("username"));
      setAccountname(localStorage.getItem("accountname"));
      setUserID(parseInt(localStorage.getItem("userid")));
    }
  }, []);

  return (
    <>
      <LoginContext.Provider
        value={{
          login,
          setLogin,
          userID,
          setUserID,
          username,
          setUsername,
          accountname,
          setAccountname,
        }}
      >
        {props.children}
      </LoginContext.Provider>
    </>
  );
};

const useLoginContext = () => {
  return useContext(LoginContext);
};

export { LoginProvider, useLoginContext };
