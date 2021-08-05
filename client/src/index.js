import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import initialData from './initial-data';
import Column from './column';
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import API from './utils/API';


const Container = styled.div`
  display: flex;
`;



function App()  {
  const [state, setState] = useState({
    tasks: {},
    columns: {},
    columnOrder: []

  })
  

  useEffect(() => {
    API.getColumnsData()
      .then(res => {
        console.log(res.data)
       
      
      })
   
  },[])



  const onDragStart = () => {
    // function to modify attributes of a component on drag start
  }

  const onDragUpdate = update => {
    // function to modify attributes of a component during drag
  }

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {


      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1); 
      newTaskIds.splice(destination.index, 0, draggableId);
  
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
  
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
  
      setState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);

  };

  
    return (
      <DragDropContext 
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
        >
          <Container>
            {state.columnOrder.map(columnId => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map(taskIds => state.tasks[taskIds]);

            return <Column key={column.id} column={column} tasks={tasks} />;
            })}
        </Container>
      </DragDropContext>
    );
  

}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

