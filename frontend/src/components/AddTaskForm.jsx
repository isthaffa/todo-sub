import React, { useState } from 'react';

const AddTaskForm = ({ handleAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (!title.trim()) return;


    handleAddTask({
                id: Date.now().toString(),
                title,
                description
              });
   setTitle('')
   setDescription('')
  };

  return (
    <div className="p-6 scale-in">
      <h2 className="text-xl font-semibold mb-6">Add a Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            placeholder="What needs to be done?"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded-md border border-input bg-background min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            placeholder="Add details about this task..."
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md w-full transition-colors duration-200"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;