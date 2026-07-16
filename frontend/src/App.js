import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";
import Login from "./Login";
import Signup from "./Signup";
import "./App.css";
function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // ✅ Get user directly
  const user = JSON.parse(localStorage.getItem("user"));

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ✅ Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get("https://task-manager-mern-sf59.onrender.com/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchTasks();
  }, [fetchTasks, token]);

  // ✅ Add task
  const addTask = async () => {
    try {
      await axios.post(
        "https://task-manager-mern-sf59.onrender.com/api/tasks",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://task-manager-mern-sf59.onrender.com/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Toggle status
  const toggleStatus = async (task) => {
    try {
      const newStatus =
        task.status === "pending" ? "completed" : "pending";

      await axios.put(
        `https://task-manager-mern-sf59.onrender.com/api/tasks/${task._id}`,
        { ...task, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔐 Auth screen
  if (!token) {
    return isLogin ? (
      <Login setToken={setToken} setIsLogin={setIsLogin} />
    ) : (
      <Signup setToken={setToken} setIsLogin={setIsLogin} />
    );
  }

  return (
    <div className="container">

  <p className="welcome">Welcome, {user?.name}</p>

  <div className="header">
    <h1>Task Manager</h1>

    <button
      className="logout"
      onClick={() => {
        localStorage.clear();
        setToken(null);
      }}
    >
      Logout
    </button>
  </div>

  <TaskForm
    title={title}
    description={description}
    setTitle={setTitle}
    setDescription={setDescription}
    addTask={addTask}
  />

  {tasks.length === 0 ? (
  <h3
    style={{
      textAlign: "center",
      color: "gray",
      marginTop: "20px",
    }}
  >
    No tasks yet 📋
  </h3>
) : (
  tasks.map((task) => (
    <TaskCard
      key={task._id}
      task={task}
      deleteTask={deleteTask}
      toggleStatus={toggleStatus}
      refresh={fetchTasks}
    />
  ))
)}
</div>
  );
}

export default App;