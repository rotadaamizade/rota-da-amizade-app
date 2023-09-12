import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({children}) {

  const [navbarState, setNavbarState] = useState("")
  const [globalCategory, setGlobalCategory] = useState('')
  const [globalCity, setGlobalCity] = useState('')

  return (
    <UserContext.Provider value={{navbarState, setNavbarState, globalCategory, setGlobalCategory, globalCity, setGlobalCity}}>
      {children}
    </UserContext.Provider>
  );
}