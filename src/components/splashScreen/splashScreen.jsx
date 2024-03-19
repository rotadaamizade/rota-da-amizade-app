import { useEffect, useState } from 'react';
import './splashScreen.css';

function SplashScreen() {
  const [show, setShow] = useState(true);
  const [randomImage, setRandomImage] = useState('');

  useEffect(() => {
    const images = [
      '../../../realizadores/HotelRenar.png',
      '../../../realizadores/MatoSanto.png',
      '../../../realizadores/Natikos.png',
      '../../../realizadores/RotaDaAmizade.png',
    ];
    const selectedImage = images[Math.floor(Math.random() * images.length)];
    setRandomImage(selectedImage);

    const timer = setTimeout(() => setShow(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`splash-screen ${show ? '' : 'splash-screen-hide'}`}>
      <div>
        <img src={randomImage} alt="Imagem Aleatória" />
      </div>
    </div>
  );
}

export default SplashScreen;
