import React, { useContext } from 'react';
import { UserProvider } from "./UserContext";

const AuthWrapper = (props) => {
  return <UserProvider>{props.children}</UserProvider>;
};

export default AuthWrapper;