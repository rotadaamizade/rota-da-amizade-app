import { useContext, useEffect, useRef, useState } from 'react'
import './cityFilter.css'
import { UserContext } from '../../UserContext';

function CityFilter(){

    const { globalCity, setGlobalCity } = useContext(UserContext)
    const background = useRef();
    const popup = useRef();
  
    const closePopup = () => {
        background.current.style.opacity = '0';
        popup.current.style.bottom = '-40vh';

        setTimeout(() => {
            background.current.style.zIndex = '-1';
            popup.current.style.zIndex = '-1'; 
        }, 200);
    };
  
    const openPopup = () => {
        background.current.style.zIndex = '3';
        popup.current.style.bottom = '0';
        background.current.style.opacity = '100%';
        popup.current.style.zIndex = '4';
    };

    const cities = [
        {
            name: 'Salto Veloso',
            img: 'https://www.diocesedecacador.org.br/wp-content/uploads/sites/304/2023/03/salnto-1024x576.jpg'
        },
        {
            name: 'Tangará',
            img: 'https://turismo.tangara.sc.gov.br/uploads/sites/217/2022/12/Tangara-Cidade-Vista-Aerea-scaled-2000x1000.jpg'
        },
        {
            name: 'Joaçaba',
            img: 'https://bomdiasc.com.br/wp-content/uploads/elementor/thumbs/Jba_29agosto001-1-oqj9p5c395126l9xcdkx6y77ui8cwdh23o0x0y9caw.jpg'
        },
        {
            name: 'Videira',
            img: 'https://www.passeios.org/wp-content/uploads/2017/11/v-5.jpg'
        },
        {
            name: 'Fraiburgo',
            img: 'https://www.viagensecaminhos.com/wp-content/uploads/2019/02/hotel-renar-fraiburgo.jpg'
        },
        {
            name: 'Pinheiro Preto',
            img: 'https://1.bp.blogspot.com/-v9mDwPDP7G8/Xjxte5KY9zI/AAAAAAAAdwM/SLGHdZoOt-AKvOOzSBCCsfxOYf-TSEuvQCLcBGAsYHQ/s1600/aerea..jpg'
        }
    ]

    return(
    <>
        <div onClick={closePopup} ref={background} className='popup-background'></div>
        <div ref={popup} className='city-popup' >
            <div>
                <p onClick={() => {
                    closePopup()
                    setGlobalCity('')
                }}>Rota da Amizade</p>
                {cities.map((city, index) => (
                <p key={index} onClick={() => {
                    closePopup()
                    setGlobalCity(city.name)
                }}>{city.name}</p>
                ))}
            </div>
        </div>
        <div className='cityFilter-div'>
                    <div className='img-background'></div>
                    <img src="https://static.todamateria.com.br/upload/pa/is/paisagem-natural-og.jpg" alt="" className={`city-img ${globalCity === '' ? 'selected' : ''}`}/>
            {
                cities.map((city, index) => (
                    <img key={index} className={`city-img ${globalCity === city.name ? 'selected' : 'not-selected'}`} src={city.img} alt="" />
                ))
            }  
            <div className='gradient'></div>
            <button onClick={openPopup}>{globalCity == '' ? 'Selecione um Município' : globalCity}</button>
        </div>
    </>
    )
}

export default CityFilter