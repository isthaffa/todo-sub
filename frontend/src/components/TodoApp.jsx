import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';

const initialTasks = [
  {
    id: '1',
    title: 'Buy books',
    description: 'Buy books for the next school year'
  },
  {
    id: '2',
    title: 'Clean home',
    description: 'Need to clean the bed room'
  },
  {
    id: '3',
    title: 'Takehome assignment',
    description: 'Finish the mid term assignment'
  },
  {
    id: '4',
    title: 'Play Cricket',
    description: 'Plan the soft ball cricket match on next Sunday'
  },
  {
    id: '5',
    title: 'Help Saman',
    description: 'Saman need help with his software project'
  }
];

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`);
      setTasks(res.data || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      toast.error('Failed to load tasks');
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, newTask);
      fetchTasks()
      toast.success('Task added successfully!');

    } catch (err) {
      console.error('Error adding task:', err);
      toast.error('Failed to add task');
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
        completed: true
      });
      setTasks(tasks.filter(task => task.id !== taskId));
      toast.success('Task completed! 🎉');
      fetchTasks()
    } catch (err) {
      console.error('Error completing task:', err);
      toast.error('Failed to complete task');
    }
  };

  const handleEditTask = async (taskId, updatedTask) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/tasks/${taskId}`,
        updatedTask
      );
      
      setTasks(tasks.map(task => 
        task.id === taskId ? response.data : task
      ));
      
      toast.success('Task updated successfully!');
    } catch (err) {
      console.error('Error updating task:', err);
      toast.error('Failed to update task');
    }
  };
  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-background rounded-xl overflow-hidden shadow-sm border border-border/40">
        <div className="border-r border-border/40">
          <AddTaskForm handleAddTask={handleAddTask}  />
        </div>
        <div>
          <h2 className="text-xl font-semibold p-6 pb-2">Tasks</h2>
          <TaskList tasks={tasks}  handleCompleteTask={handleCompleteTask} handleEditTask={handleEditTask}/>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;