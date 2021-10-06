
const Button = ({children, color, onClick}) => {
    return (
        <button onClick={onClick}className='px-2 py-3 rounded bg-green-400 text-white'>{children}</button>
    )
}

export default Button
