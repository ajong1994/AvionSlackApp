
const ModalTextfield = ({label, id, type, placeholder, onChange, value, labelClass, inputClass}) => {
    
    return (
        <div className='flex flex-col'>
            <label htmlFor={id} className={labelClass}>{label}</label>
            <input 
            onChange={onChange}
            value={value}
            className={inputClass}
            id={id} 
            name={id} 
            type={type} 
            placeholder={placeholder}/>
        </div>
            
    )
}

export default ModalTextfield
