import React from 'react';
import TodoItem from './TodoItem';

const TaskList = ({ tasks, handleCompleteTask  ,handleEditTask}) => {
  if (tasks.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground fade-in">
        <p>No tasks yet. Add a task to get started!</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {tasks?.map((task) => (
        <TodoItem key={task.id} task={task} handleCompleteTask={handleCompleteTask} handleEditTask={handleEditTask} />
      ))}
    </div>
  );
};

export default TaskList;
