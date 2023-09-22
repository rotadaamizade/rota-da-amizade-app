import './header2.css'

function Header2(props){
    return(
        <div className='header2-div'>
            <img src={props.img} className='header2-img'/>
            <div className='gradient'></div>
            <div className='header2-content'>
                <div>
                    <h1>{props.text1}</h1>
                    <h2>{props.text2}</h2>
                </div>
            </div>
        </div>
    )
}

export default Header2