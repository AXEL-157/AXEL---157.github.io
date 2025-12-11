import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./css/style2.css";

function App() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const[Popup, modifyPopup] = useState(false);
  const [viewtask, setviewTask] = useState(null);
  const [onepopup, setOnepopup] = useState(false);
  const [formData, setFormData] = useState({
      title: "",
      description: "",
      due_time:"",
      status: ""
    });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const deletetask = async(taskId)=> {
    const token = localStorage.getItem("token");

    try {
    const res = await fetch(`http://localhost:3002/api/todos/deltodo/${taskId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (res.status === 401 || res.status === 403) {
      alert(data.error);
      localStorage.removeItem("token");
      navigate("/login");
    } else if (res.ok) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      alert("Task deleted successfully!");
    } else {
      alert(data.error || "Failed to delete task.");
    }
  } catch (err) {
    console.error("Error deleting task:", err);
    alert("Error deleting task.");
  }
};

  const deleteAlltasks = async(e)=> {
    if (!window.confirm("Are you sure you want to delete ALL tasks? This cannot be undone.")) {
    return;
  }
    const token = localStorage.getItem("token");

    try{
      const res = await fetch("http://localhost:3002/api/todos/delalltodo", {
        method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

      const data = await res.json();
      if (res.status === 401 || res.status === 403) {
      alert(data.error);
      localStorage.removeItem("token");
      navigate("/login");
      }else if (res.ok){
        setTasks([]);
        alert("All Tasks deleted successfully!");
         } else {
      alert(data.error || "Failed to delete tasks.");
    }
  } catch (err) {
    console.error("Error deleting tasks:", err);
    alert("Error deleting tasks.");
  }
};


   const update = async (taskId, newStatus) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:3002/api/todos/updatetodo/${taskId}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await res.json();

      if (res.status === 401 || res.status === 403) {
        alert(data.error);
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        );
        alert("Task status updated!");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update task status.");
    }
  };

  useEffect(() => {
    const getallTasks = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3002/api/todos/alltodos", {
        headers: { "Authorization": `Bearer ${token}` }
      });

      const data = await res.json();

      if (res.status === 401 || res.status === 403) {
        alert(data.error);
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        setTasks(data);
      }
    };

    getallTasks();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.due_time) {
    alert("Please fill in all required fields");
    return;
  }
   


    const token = localStorage.getItem("token");
    
    const res = await fetch("http://localhost:3002/api/todos/newtodo", {
      method: "POST",
      headers: { "Content-Type": "application/json" ,
        "Authorization": `Bearer ${token}`},
        body: JSON.stringify({
        title: formData.title,
        description: formData.description, 
        due_time: formData.due_time,
        status: "not_started"
  }),
});;
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Failed to create task");
      return;
    } else {
    const now = new Date().toISOString(); 
    const newTodo = { 
      id: data.id, 
      title: formData.title, 
      description: formData.description, 
      due_time: formData.due_time, 
      status: "not_started" ,
      created_at: now
    };
    setTasks(prevTasks => [...prevTasks, newTodo]);
    setFormData({ title: "", description: "", due_time: "", status: "not_started" });
    modifyPopup(false);
    alert("Task Created");
}
}

const viewTaskById = async (taskId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:3002/api/todos/todo/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Task not found");
        return;
      }

      setviewTask(data);
      setOnepopup(true);
    } catch (err) {
      console.error("Error fetching task:", err);
      alert("Error fetching task");
    }
  };

  return (
    <>
    <div className="corps">
      <div id="myDIV" className="header">
        <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <img className="title" src="/image/f4a3afb2-e879-4dea-a098-68eb33ee859c (1).png" alt="logo_to_do_list" width="60" height="60"/>
        <h2 className="title">My To Do List</h2>
        <button className="logoutBtn" onClick={() => modifyPopup(true)}>Create A Task</button> 
        <button className="logoutBtn" onClick={() => {localStorage.removeItem("token"); navigate("/");}}>Logout</button> 
        <button className="logoutBtn" onClick={() =>  navigate("/profile")}>Profile</button>
        <button className="logoutBtn2" onClick={() => deleteAlltasks()}>Delete All Tasks</button>
        </div>
      </div>

      <div id="myUL" className="liste">
        {
        Popup &&
        <div className="popup-overlay">
          <form className="popup-form" onSubmit={handleSubmit}>
            <h2>Your New Task</h2>
            <input name="title" value={formData.title} placeholder="Task Title" onChange={handleChange} />
            <textarea name="description" value={formData.description} placeholder="Your Description" onChange={handleChange} className="textarea" />
            <input type="date" value={formData.due_time} name="due_time" onChange={handleChange} />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => modifyPopup(false)}>Cancel</button>
          </form>
        </div>
        }
        {tasks.map((task) => (
    <div key={task.id} className="task">
      <span><strong>•Title:</strong> {task.title}</span> {" "}
      <span><strong>Date of Creation:</strong> {task.created_at.split("T")[0]}</span> {" "}
      <span><strong>Due:</strong> {task.due_time.split("T")[0]}</span> {" "}
      <span><strong>Status:</strong> {task.status}</span> {" "}
      <select className={`logoutBtn2 status-${task.status}`}
                value={task.status}
                onChange={(e) => update(task.id, e.target.value)}
              >
                <option  value="not_started">Not Started</option>
                <option  value="todo">To Do</option>
                <option  value="in_progress">In Progress</option>
                <option  value="done">Done</option>
      </select> {" "}
      <button className="logoutBtn3" onClick={() => deletetask(task.id)}>Delete</button> {" "}
      <button className="logoutBtn4" onClick={() => viewTaskById(task.id)}>View</button>
    </div>
))}
      </div>
    </div>
    {onepopup && viewtask && (
      <div className="popup-overlay">
        <div className="popup">
          <h2>Task Details</h2>
          <p><strong>Title:</strong> {viewtask.title}</p>
          <p><strong>Description:</strong> {viewtask.description}</p>
          <p><strong>Date of Creation:</strong> {viewtask.created_at.split("T")[0]}</p>
          <p><strong>Due Date:</strong> {viewtask.due_time.split("T")[0]}</p>
          <p><strong>Status:</strong> {viewtask.status}</p>
          <button onClick={() => setOnepopup(false)}>Close</button>
        </div>
      </div>
      )}
    </>
  );
}

export default App;
