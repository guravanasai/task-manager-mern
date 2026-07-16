import React, { useState } from "react";
import axios from "axios";

function TaskCard({ task, deleteTask, toggleStatus, refresh }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const token = localStorage.getItem("token");

  const updateTask = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsEditing(false);
      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="task-card">
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="add-btn" onClick={updateTask}>
            Save
          </button>
        </>
      ) : (
        <>
          <div
            className={`task-title ${
              task.status === "completed" ? "completed" : ""
            }`}
          >
            {task.title}
          </div>

          <p>{task.description}</p>

         <p>
            <strong>Status:</strong>{" "}
            <span className={task.status === "completed" ? "completed" : ""}>
            {task.status}
            </span>
          </p>

          <div className="task-actions">
            <button
              className="toggle"
              onClick={() => toggleStatus(task)}
            >
              {task.status === "pending" ? "Done" : "Undo"}
            </button>

            <button
              onClick={() => setIsEditing(true)}
              style={{ background: "#ffa500", color: "white" }}
            >
              Edit
            </button>

            <button
              className="delete"
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskCard;