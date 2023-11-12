import './cityCard.css'
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';

function CityCard(props) {

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const animation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0)' : 'translateX(100%)',
    config: { duration: 500 },
    delay: inView ? props.index * 200 : 0,
  });

  const navigate = useNavigate()

  const linkto = () => {
    navigate(`/municipio/${props.id}`)
  }

  return (
    <animated.div ref={ref} style={animation} onClick={linkto} className='card-div'>
      <img src={props.img} alt="" />
      <div className='card-gradient' />
      <div className='card-content'>
        <div className='card-text'>
          <h1>{props.name}</h1>
          <h2>{props.slogan}</h2>
        </div>
      </div>
    </animated.div>
  )

}

export default CityCard;