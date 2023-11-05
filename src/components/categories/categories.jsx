import { useContext, useEffect, useState } from 'react'
import './categories.css'
import { UserContext } from '../../UserContext'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import StringToHtml from '../stringToHtml/stringToHtml'

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

    console.log(categories)

    return (
        <div className='categorie-div'>
          {categories.map((button, index) => (
            <div onClick={() => {
                if(category == button.nome){
                    setCategory('')
                } else{
                    setCategory(button.nome)
                }
            }} className='categorie-button-div' key={index}>
                <div style={{backgroundColor: "#" + button.corFundo}} className={category == button.nome ? 'category-button-active categorie-button'  : 'categorie-button'}>
                    <StringToHtml htmlString={button.svg} />
                </div>
                <p>{button.nome}</p>
            </div>
          ))}
        </div>
    )
}

export default Categories