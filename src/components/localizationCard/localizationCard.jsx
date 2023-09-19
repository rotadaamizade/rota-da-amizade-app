import './localizationCard.css'

function LocalizationCard(){
    return(
        <div className='localization-div'>
            <div className='localization-gradient'/>
            <div className='localization-button'>
                <p>Abrir no Mapa</p>
            </div>
            <div className='localization-text'>
                <h1>
                    Rua Barão de Vitória
                </h1>
                <h2>
                    Casa Grande - 190
                </h2>
            </div>
            <img src="https://www.apsecosmetics.com.br/cdn/shop/files/Img-Localizacao_400x.jpg?v=1666818807" alt="" />
        </div>
    )
}

export default LocalizationCard