
const Textfield = ({label, id, type, placeholder, onChange}) => {

    const handleValueChange = (e) => {
        if(onChange) {
            onChange(e.target.value)
        }
    }
    return (
        <div className='flex flex-col'>
            <label htmlFor={id}>{label}</label>
            <input 
            onChange={handleValueChange}
            className='border border-black rounded p-2'
            id={id} 
            name={id} 
            type={type} 
            placeholder={placeholder}/>
        </div>
            
    )
}

export default Textfield
