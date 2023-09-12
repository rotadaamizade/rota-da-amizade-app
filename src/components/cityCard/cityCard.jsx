import './cityCard.css'

function CityCard(props){
    return(
        <div className='card-div'>
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