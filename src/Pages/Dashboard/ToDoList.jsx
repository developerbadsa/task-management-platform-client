
import React from 'react';
import Board from './DragableTask/Board';
import { useQuery } from '@tanstack/react-query';
import useUserInfo from '../../Hooks/useUserInfo/useUserInfo';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToDoList = () => {
  const { user } = useUserInfo();

      const [tasks, setTasks] = React.useState({
      todo:  [],
      ongoing:  [],
      completed:  [],
    });

  const { data: TodoTask, isLoading: TodoTaskLoading, refetch: TodoTaskRefetch } = useQuery({
    queryKey: ['TodoTask'],
    queryFn: async () => {
      const data = await fetch(`https://task-management-platform-server-arzz.vercel.app/tasks?status=todo&email=${user?.email}`);
      return await data.json();
    }
  });

  const { data: OngoingTask, isLoading: OngoingTaskLoading , refetch: OngoingTaskRefetch} = useQuery({
    queryKey: ['OngoingTask'],
    queryFn: async () => {
      const data = await fetch(`https://task-management-platform-server-arzz.vercel.app/tasks?status=ongoing&email=${user?.email}`);
      return await data.json();
    }
  });

  const { data: CompletedTask, isLoading: CompletedTaskLoading, refetch: CompletedTaskRefetch } = useQuery({
    queryKey: ['CompletedTask'],
    queryFn: async () => {
      const data = await fetch(`https://task-management-platform-server-arzz.vercel.app/tasks?status=completed&email=${user?.email}`);
      return await data?.json();
    }
  });


  const loading = TodoTaskLoading || OngoingTaskLoading || CompletedTaskLoading;

  if (loading) {
      return 'loading';
    }

    const refetchAll = ()=>{

      
      TodoTaskRefetch ()
      OngoingTaskRefetch()
      CompletedTaskRefetch()
    }



const onDragEnd = (result) => {
      if (!result?.destination) return;

      const { source, destination, draggableId } = result;
      axios.put(`https://task-management-platform-server-arzz.vercel.app/task-status?shouldgo=${destination?.droppableId}&email=${user?.email}&id=${draggableId}`)
      .then(res=>{
            if(res?.data.modifiedCount){
                  toast.success(`Moved to ${destination?.droppableId} Successfully`)
                 
                  refetchAll()

            }
      })

      // Create a copy of the tasks object
      const updatedTasks = { ...tasks };

      // Remove the dragged task from the source list
      const [removedTask] = updatedTasks[source.droppableId].splice(source.index, 1);

      // Add the dragged task to the destination list
      updatedTasks[destination.droppableId].splice(destination.index, 0, removedTask);

      console.log('Updated Tasks:', updatedTasks);

      // Update the state with the new tasks
      setTasks(updatedTasks);
};


    return (
      <div className="p-8 lg:py-20">
             <ToastContainer />
        <Board todo={TodoTask} ongoing={OngoingTask} completed={CompletedTask} onDragEnd={onDragEnd} refetchAll={refetchAll}/>
      </div>
    );
  
};

export default ToDoList;
