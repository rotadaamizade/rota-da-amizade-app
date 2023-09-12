import { useContext, useEffect, useState } from 'react'
import './categories.css'
import { UserContext } from '../../UserContext'

function Categories(props){

    const { globalCategory, setGlobalCategory } = useContext(UserContext)

    useEffect(() => {
        return () => {
            setGlobalCategory('')
        }
      }, [])

    return (
        <div className='categorie-div'>
          {props.buttons.map((button, index) => (
            <div onClick={() => {
                if(globalCategory == button.name){
                    setGlobalCategory('')
                } else{
                    setGlobalCategory(button.name)
                }
            }} className='categorie-button-div' key={index}>
                <div style={{backgroundColor: button.background_rgb}} className={globalCategory == button.name ? 'category-button-active categorie-button'  : 'categorie-button'}> {button.svg}</div>
                <p>{button.name}</p>
            </div>
          ))}
        </div>
    )
}

export default Categories