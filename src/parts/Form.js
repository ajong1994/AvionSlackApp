
const Form = ({children}) => {

    function onSubmitHandler(e){
        e.preventDefault();
    }
    
    return (
        <form onSubmit={onSubmitHandler}>
            {children}
        </form>
    )
}

export default Form
