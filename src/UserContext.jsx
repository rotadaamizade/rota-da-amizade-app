import { doc, getDoc } from 'firebase/firestore';
import React, { createContext, useState, useEffect } from 'react';
import { db } from './config/firebase';

export const UserContext = createContext();

export function UserProvider({ children }) {

  const [categoriesEventos, setCategoriesEventos] = useState([])
  const [categoriesAssociados, setCategoriesAssociados] = useState([])
  const [categoriesAtrativos, setCategoriesAtrativos] = useState([])

  useEffect(() => {
    getCategories()
  },[])

  const getCategories = async () => {

    try {
      const docRef = doc(db, "categorias", 'eventos')
      const docSnap = await getDoc(docRef)
      setCategoriesEventos(docSnap.data().tipos)

    } catch (error) {
      console.log(error)
    }

    try {
      const docRef = doc(db, "categorias", 'associados')
      const docSnap = await getDoc(docRef)
      setCategoriesAssociados(docSnap.data().tipos)

    } catch (error) {
      console.log(error)
    }

    try {
      const docRef = doc(db, "categorias", 'atrativos')
      const docSnap = await getDoc(docRef)
      setCategoriesAtrativos(docSnap.data().tipos)

    } catch (error) {
      console.log(error)
    }
  }


  const [navbarState, setNavbarState] = useState("")
  const [globalCategory, setGlobalCategory] = useState('')
  const [globalCity, setGlobalCity] = useState('')

  return (
    <UserContext.Provider value={{ navbarState, setNavbarState, globalCategory, setGlobalCategory, globalCity, setGlobalCity, categoriesAssociados, categoriesAtrativos, categoriesEventos }}>
      {children}
    </UserContext.Provider>
  );
}