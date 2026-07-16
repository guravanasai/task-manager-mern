import React from "react";

function TaskForm({ title, description, setTitle, setDescription, addTask }) {
  return (
    <div className="form">
      <input
        type="text"
        placeholder="Enter task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="add-btn" onClick={addTask}>
        Add Task
      </button>
    </div>
  );
}

export default TaskForm;