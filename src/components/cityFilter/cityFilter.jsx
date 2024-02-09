import { useContext, useEffect, useRef, useState } from 'react'
import './cityFilter.css'
import { UserContext } from '../../UserContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { motion } from "framer-motion"

function CityFilter() {

    const { globalCity, setGlobalCity } = useContext(UserContext)
    const background = useRef()
    const popup = useRef()
    const [cities, setCities] = useState([])

    useEffect(() => {
        getCities()
    }, [])

    const getCities = async () => {
        try {
            const data = await getDocs(collection(db, "municipios"))
            const citiesData = []

            data.forEach((doc) => {
                const cityData = {
                    municipio: doc.data().municipio,
                    img: doc.data().imgCard.url
                }

                citiesData.push(cityData)
            })

            setCities(citiesData)
        } catch (error) {
            console.error("Erro ao recuperar documentos:", error)
        }
    }

    const closePopup = () => {
        background.current.style.opacity = '0'
        popup.current.style.bottom = '-40vh'

        setTimeout(() => {
            background.current.style.zIndex = '-1'
            popup.current.style.zIndex = '-1'
        }, 200)
    }

    const openPopup = () => {
        background.current.style.zIndex = '3'
        popup.current.style.bottom = '0'
        background.current.style.opacity = '100%'
        popup.current.style.zIndex = '4'
    }


    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1, transition: { duration: 0.25 } }}
            className='city-header-container'
        >
            <div onClick={closePopup} ref={background} className='popup-background'></div>
            <div ref={popup} className='city-popup' >
                <div className='rota-button' onClick={() => {
                    closePopup()
                    setGlobalCity('')
                }}>Rota da Amizade</div>
                <div className='cities-button-div'>
                    {cities.map((city, index) => (
                        <p key={index} onClick={() => {
                            closePopup()
                            setGlobalCity(city.municipio)
                        }}>{city.municipio}</p>
                    ))}
                </div>
            </div>
            <div className='cityFilter-div'>
                <div className='img-background'></div>
                <img src="https://static.todamateria.com.br/upload/pa/is/paisagem-natural-og.jpg" alt="" className={`city-img ${globalCity === '' ? 'selected' : ''}`} />
                {
                    cities.map((city, index) => (
                        <img key={index} className={`city-img ${globalCity === city.municipio ? 'selected' : 'not-selected'}`} src={city.img} alt="" />
                    ))
                }
                <div className='gradient'></div>
                <button onClick={openPopup}>{globalCity == '' ? 'Selecione um Município' : globalCity}</button>
            </div>
        </motion.section>
    )
}

export default CityFilter