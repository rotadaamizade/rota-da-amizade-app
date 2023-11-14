import './headerAssociado.css'

function HeaderAssociado(props){
    return(
        <div className='headerAssociado-div'>
            <img src={props.img} className='headerAssociado-img'/>
            <div className='gradient'></div>
            <div className='headerAssociado-content'>
                <img className='associado-logo' src={props.logo} alt="" />
                <div className='headerAssociado-text'>
                    <h1>{props.nome}</h1>
                    <h2>{props.municipio}</h2>
                </div>
            </div>
        </div>
    )
}

export default HeaderAssociado