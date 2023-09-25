import './cityCard.css'
import { useNavigate } from 'react-router-dom';

function CityCard(props){

    const navigate = useNavigate()

    const linkto = () => {
      navigate(`/municipio/${props.id}`)
    }

    return(
        <div onClick={linkto} className='card-div'>
        <img src={props.img} alt="" />
        <div className='card-gradient' />
        <div className='card-content'>
          <div className='card-text'>
            <h1>{props.name}</h1>
            <h2>{props.slogan}</h2>
          </div>
        </div>
      </div>
    )

}

export default CityCard;