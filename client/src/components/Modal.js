import React, {useState} from 'react'
import styled from 'styled-components'


const Modal = (props) => {

    const [formObject, setFormObject] = useState({})

    function handleFormSubmit(event) {
        event.preventDefault();
        props.openModal();
    };

    function handleInputChange(event) {
        const {name, value} = event.target;
        setFormObject({...formObject, [name]: value})
    };

    return (
        
            <form>
                <label>New Task</label>
                <input type="text" name="newTask" onChange={handleInputChange} placeholder="New Task Description" />
                <button type="button" onClick={handleFormSubmit}>Submit</button>
            </form>
    
    )
}

export default Modal 