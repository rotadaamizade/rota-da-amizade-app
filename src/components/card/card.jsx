import { useNavigate } from 'react-router-dom';
import './card.css';

function Card(props) {

  const navigate = useNavigate()

  const linkto = () => {
    if(props.type == 'evento'){
      navigate(`/evento/${props.id}`)
    } else if(props.type == 'associado'){
      navigate(`/associado/${props.id}`)
    }
  }

  return (
    <div onClick={linkto} className='card-div'>
      <img src={props.img} alt="" />
      <div className='card-gradient' />
      <div className='date-content'>
        {props.dates != null && (
          props.dates.map((date, index) => (
            <div className='date-div' key={index}>
                <p className='date-number'>{date.day}</p>
                <p className='date-text'>
                {[
                    'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN',
                    'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'
                ][date.month - 1]}
                </p>
            </div>
          ))
        )}
      </div>
      <div className='card-content'>
        <div className='card-text'>
          <h1>{props.name}</h1>
          <h2>{props.city}</h2>
        </div>
        <div className='card-svg'>{props.svg}</div>
      </div>
    </div>
  );
}

export default Card;
