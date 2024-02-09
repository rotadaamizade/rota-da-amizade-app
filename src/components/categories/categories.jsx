import { useContext, useEffect, useState } from 'react'
import './categories.css'
import { UserContext } from '../../UserContext'
import { useNavigate } from 'react-router-dom'
import CategoryButton from '../categoryButton/categoryButton'

function Categories({category, setCategory, type}){

    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    
    const { categoriesAssociados, categoriesAtrativos, categoriesEventos } = useContext(UserContext)

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async () => {
        if (type == 'eventos'){
            setCategories(categoriesEventos)
        } else if (type == 'associados'){
            setCategories(categoriesAssociados)
        } else if (type = 'atrativos'){
            setCategories(categoriesAtrativos)
        }
    }

    return (
        <div className='categorie-div'>
          {categories.map((button, index) => (
            <CategoryButton
            key={index}
            button = {button}
            setCategory = {setCategory}
            category = {category}
            index = {index}
            />
          ))}
        </div>
    )
}

export default Categories