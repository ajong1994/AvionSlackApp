
const Textfield = ({label, id, type, placeholder, onChange, value}) => {
    
    return (
        <div className='flex flex-col'>
            <label htmlFor={id}>{label}</label>
            <input 
            onChange={onChange}
            value={value}
            className='border border-black rounded p-2'
            id={id} 
            name={id} 
            type={type} 
            placeholder={placeholder}/>
        </div>
            
    )
}

export default Textfield
