import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({children}) {

  const [navbarState, setNavbarState] = useState("inicio")

  return (
    <UserContext.Provider value={{navbarState, setNavbarState}}>
      {children}
    </UserContext.Provider>
  );
}