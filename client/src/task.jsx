import React from 'react'
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
   
`;

const HoverWrapper = styled.div`
    float: right;
`
const Button = styled.button`
    border: 1px solid black;
    border-radius: 100px;
    
    background-color: darkgrey;
    ${HoverWrapper}: hover & {
        background-color: purple;
    }
`;

export default function Task(props) {
    
        return (
            <Draggable 
                draggableId={props.task._id} 
                index={props.index}
                
            >
                {(provided, snapshot) => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        {props.task.content}
                        <HoverWrapper>
                        <Button type="button" onClick={() => props.deleteTask(props.task._id)}>X</Button>
                        </HoverWrapper>
                        
                    </Container>

                )}
            </Draggable>

        );
    
}
