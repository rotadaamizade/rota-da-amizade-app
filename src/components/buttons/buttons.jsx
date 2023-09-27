import './buttons.css'

function Buttons(props){
    return (
        <>
        <div className='buttons-container'>
            {props.localization !== '' && (
            <a target='_blank' href={props.localization}>
                <div className='localization-button'>Abrir Localização</div>
            </a>

            )}
            {props.contatos.length > 0 && (
            <div className='contatos-button' onClick={props.openContatos}>
                Contatos
            </div>
            )}

            {props.redes.length > 0 && (
            <div className='redes-button' onClick={props.openRedes}>
                Redes Sociais
            </div>
            )}

        </div>
        </>
    )
}

export default Buttons