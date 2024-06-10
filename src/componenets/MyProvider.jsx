import React, { useContext } from 'react';
import { UserProvider } from "./UserContext";

const MyProvider = (props) => {
  return <UserProvider>{props.children}</UserProvider>;
};

export default MyProvider;