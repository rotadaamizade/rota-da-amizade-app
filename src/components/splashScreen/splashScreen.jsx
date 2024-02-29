import './splashScreen.css'

function SplashScreen(){

    const images = [
        '../../../realizadores/HotelRenar.svg',
        '../../../realizadores/MatoSanto.svg',
        '../../../realizadores/Natikos.png',
        '../../../realizadores/RotaDaAmizade.svg',
      ];
    
      const randomImage = images[Math.floor(Math.random() * images.length)];


    return <div className='splashScreen_background'>
        <div>
            <p>Realização</p>
            <img src={randomImage} alt="Imagem Aleatória" />
        </div>
    </div>
}

export default SplashScreen;