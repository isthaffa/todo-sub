import React, { useState } from 'react';
import TodoApp from '../components/TodoApp';

const Dashboard = ({}) => {
    const [tasks, setTasks] = useState([]);

   
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/50 to-background pt-8">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 fade-in">Todos</h1>
        </header>
        <TodoApp />
      </div>
    </div>
  );
};

export default Dashboard;