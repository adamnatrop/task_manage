import React from 'react'
import styled from 'styled-components';
import Task from './task'
import { Droppable } from 'react-beautiful-dnd';



export default function Column(props) {
    
    const topColumnColorBar = (props) => {
        let colorBar = ""
        switch (props.column.title) {
            case "To Do":
                colorBar = "lightblue";
                return colorBar
                
            case "In Progress":
                colorBar = "orange";
                return colorBar
                
            case "Completed": 
                colorBar = "forestgreen";
                return colorBar
                
            default:
                colorBar = "gray";
                return colorBar
        }
    }
    
    const Container = styled.div`
        margin: 8px;
        border-top: 3px solid ${topColumnColorBar(props)};
        border-radius: 2px;
        width: 220px;
        background-color: #ebeef2;
        display: flex;
        flex-direction: column;
        
    `;
    const Title = styled.h3`
        padding: 8px;
    `;
    const HoverWrapper = styled.div`
        
    `;
    const NewTaskBtn = styled.div`
        margin-left: 40%;
        padding-top: 8px;
        display:inline-block;
        width:25px;
        height:25px;
  
        background:
            linear-gradient(#898b8f,#898b8f),
            linear-gradient(#898b8f,#898b8f),
            #ebeef2;
        background-position:center;
        background-size: 50% 2px,2px 50%; /*thickness = 2px, length = 50% (25px)*/
        background-repeat:no-repeat;
        ${HoverWrapper}: hover & {
            background:
                linear-gradient(#6c6d70,#6c6d70),
                linear-gradient(#6c6d70,#6c6d70),
                #ebeef2;
            background-position:center;
            background-size: 50% 2px,2px 50%; /*thickness = 2px, length = 50% (25px)*/
            background-repeat:no-repeat;
        }
    `;
    const TaskList = styled.div`
        padding: 8px;
        transition: background-color 0.2s ease;
        background-color: ${props => (props.isDraggingOver ? '#95a4bd' : '#ebeef2' )};
        flex-grow: 1;
        min-height: 100px;
        `;
    
        return (
            <Container>
                <Title>
                    {props.column.title} 
                    {/* Conditional Formating for adding new task to first column only */}
                    {/* {props.column.title === "To Do" && (
                        <NewTaskBtn onClick={() => props.openModal(props.column.id)}>
                            <button onClick={() => props.openModal(props.column.id)}>Add New Task</button>
                        </NewTaskBtn>
                        )} */}
                </Title>
               
                
                <Droppable 
                    droppableId={props.column.id} 
                    // type={this.props.column.id === 'column-3' ? 'done' : 'active'}
                >
                    {(provided, snapshot) => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {props.tasks.map((task, index) => (
                                
                                <Task key={task._id} task={task} index={index} deleteTask={props.deleteTask}/>
                            ))}
                            {provided.placeholder}
                        </TaskList>
                    )}
                    
                </Droppable>
                <HoverWrapper><NewTaskBtn onClick={() => props.openModal(props.column.id)}></NewTaskBtn></HoverWrapper>
            </Container>
        )
    
}
