// TaskList.js
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const TaskList = ({ title, tasks, droppableId, refetchAll }) => {

  return (
    <div className=" p-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="border border-gray-300 rounded">
            {tasks?.map((task, index) => (
              <Task key={task?._id} task={task} index={index} refetchAll={refetchAll} />
            ))}
            {provided?.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;
