import { Check, X } from "lucide-react";
import React, { useState } from "react";

const TodoItem = ({ task, handleCompleteTask, handleEditTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSave = () => {
    handleEditTask(task.id, {
      title: editedTitle,
      description: editedDescription,
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-card bg-[#d6d6d6] rounded-lg p-4 mb-4 shadow-sm border border-border/40 hover:shadow-md transition-all duration-200 slide-in">
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSave}
              className="p-2 text-green-500 hover:bg-green-50 rounded"
            >
              <Check size={18} />
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedTitle(task.title);
                setEditedDescription(task.description);
              }}
              className="p-2 text-red-500 hover:bg-red-50 rounded"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className=" text-[#080808] text-xl font-medium text-base ">
          {task.title.charAt(0).toUpperCase() + task.title.slice(1)}          </h3>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-[#080808] text-muted-foreground text-sm mt-1">
                {task?.description.charAt(0).toUpperCase() + task?.description.slice(1)}

              </p>
            </div>
            <div className="flex space-x-2">
              {/* <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded"
            >
              <Pencil size={18} />
            </button> */}
              <button
                onClick={() => handleCompleteTask(task.id)}
                className="bg-secondary border border-black hover:bg-secondary/80 text-secondary-foreground px-3 py-1 rounded-md text-sm transition-colors duration-200"
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
