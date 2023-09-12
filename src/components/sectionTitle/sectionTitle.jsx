import './sectionTitle.css'

function SectionTitle(props){
    return(
        <div className='title-div'>
            <h1 className='text-1'>{props.text1}</h1>
            <h1 className='text-2'>{props.text2}</h1>
        </div>
    )
}

export default SectionTitle