import './emptyList.css'

function EmptyList(props){
    return(
        <div className='emptyList-div'>
            <p>Sem {props.type} Disponíveis.</p>
        </div>
    )
}

export default EmptyList