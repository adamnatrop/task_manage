import React, {useState} from 'react'
import styled from 'styled-components'
import API from '../utils/API'

const Modal = (props) => {

    const [formObject, setFormObject] = useState({})

    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.newTask) {
            console.log(typeof(formObject.newTask));
            API.addNewTask({
                content: formObject.newTask
            })
            .then(res => {
                console.log('newTask', res)
                console.log('taskid', res.data._id)
                API.addTaskToColumn({taskId: res.data._id, columnId: props.sourceColumnId})
                .then(res => {
                    console.log('Added Task')
                    props.setCount(props.count +1)
                    console.log(props.count)
                })
            })
        }
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