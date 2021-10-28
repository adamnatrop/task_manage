import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Column from './column';
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import API from './utils/API';
import Modal from './components/Modal.js'

const Container = styled.div`
  display: flex;
`;



function App()  {
  const [renderReady, setRenderReady] = useState(false)
  const [tasksState, setTasks] = useState({});
  const [columns, setColumns] = useState({});
  const [columnOrder, setColumnOrder] = useState([])
  const [count, setCount] = useState(0)

  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(prev => !prev);
    console.log(showModal)
  }


  useEffect(() => {
    (async () => {
      
    await API.getColumnsData()
      .then(res => {
       
        let orderArr = [];
        for ( let i = 0; i < res.data.length; i++ ){
          let column = 
            {
              id: res.data[i]._id,
              title: res.data[i].title,
              taskIds: res.data[i].taskIds
            }
          const prevColState = columns
          const newColumnState = {
         
            [res.data[i]._id]: column,
          }
          const pushColObj = Object.assign(prevColState, newColumnState)
          
          setColumns(pushColObj)
      
          let order = res.data[i]._id
          orderArr.push(order)

          for ( let j = 0; j < res.data[i].taskIds.length; j++){
            let task = {
              _id: res.data[i].taskIds[j]._id,
              content: res.data[i].taskIds[j].content,
            }
            const prevTaskState = tasksState
            const newTaskState = {
              [res.data[i].taskIds[j]._id]: task,
            }
            const pushTaskObj = Object.assign(prevTaskState, newTaskState)
            setTasks(pushTaskObj)
          }
          
        }
        setColumnOrder(orderArr);
      })
    })()
     return () => {
      setRenderReady(true)
     }
      

  },[count])

  const addNewTask = (taskData) => {
    
    API.addNewTask(taskData)
    .then(res => {
      console.log('task res', res)
      
    })
    .catch(err => console.log("Add New Task Error", err))
  }

  const deleteTask = (taskId) => {
    API.deleteTask(taskId)
    .then( res => {
      console.log('delete task', res)
      setCount(count +1)
    })
    .catch(err => console.log('delete task error', err))

  }

  const updateColumnsDBState = (draggableId, destinationId, sourceId) => {
    let stateId = {
      taskId: draggableId,
      destinationColumnId: destinationId,
      sourceColumnId: sourceId
    }
    API.updateState(stateId)
    .then(res => {
      console.log('updateState', res)
    })
    .catch(err => console.log('updateState error', err))
  }

  const onDragStart = () => {
    // function to modify attributes of a component on drag start
  }

  const onDragUpdate = update => {
    // function to modify attributes of a component during drag
  }

  const onDragEnd = result => {
    console.log(result)
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log(columns[destination.droppableId])
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];
    
    if (start === finish) {
      

      const newTaskIds = Array.from(start.taskIds);
      //console.log("ids",newTaskIds)
      newTaskIds.splice(source.index, 1);
      const newEntry = tasksState[draggableId]
      
      newTaskIds.splice(destination.index, 0, newEntry);
      console.log("ids", newTaskIds)
      console.log("start", start)
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      console.log("newColumn", newColumn)

      const newColumnState = {
        ...columns,
        [newColumn.id]: newColumn,
      }

      console.log("colState", newColumnState)
    
      setColumns(newColumnState)
      console.log(columns)
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
    const newTaskEntry = tasksState[draggableId]
    finishTaskIds.splice(destination.index, 0, newTaskEntry);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newColumnState = {
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };
    setColumns(newColumnState);

    updateColumnsDBState(draggableId, destination.droppableId, source.droppableId);

  };

  
    return (
      <>
      { renderReady ? (
        <DragDropContext 
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdate}
          onDragEnd={onDragEnd}
        >
        { columnOrder.length > 1 ? (
          
          <>     
          <Container>
                
              {columnOrder.map(columnId => {
              const column = columns[columnId]; 
              return <Column 
              key={column.id} 
              column={column} 
              tasks={column.taskIds} 
              addNewTask={addNewTask} 
              openModal={openModal}  
              deleteTask={deleteTask}
              />;
              })}

          </Container>

          { showModal ? <Modal openModal={openModal} setCount={setCount} count={count}> </Modal> : null }

          </>
         ) : (
           <p>No Task Data to Load</p>
         )}
        
        
        </DragDropContext>
      ) : (
      <>
        <p>Loading...</p>
        <button type="submit" onClick={() => setCount(+1)}>Start App</button>
      </>
      )}

     
      </>
    );
  

}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

