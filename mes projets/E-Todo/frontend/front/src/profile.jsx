import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
 
 
function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [Popup, modifyPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    firstname: "",
    email: "",
    password: "",
  });
 
  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
 
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.userId;
 
        const res = await fetch(`http://localhost:3002/api/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
 
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.log("Erreur :", err);
      }
    }
    fetchUser();
  }, []);
 
  if (!user)
    return <p style={{ color: "white", textAlign: "center" }}>Chargement...</p>;
 
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Do you really want to delete your account ?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.userId;

      const res = await fetch(`http://localhost:3002/api/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete account");
      }
      setUser(null);
      alert("Account Deleted");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("There was an error deleting your account");
    }
  };

 
  const EditPopup = () => {
    setFormData({
      name: user.name,
      firstname: user.firstname,
      email: user.email,
      password: "",
    });
    modifyPopup(true);
  };
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const updatedFields = {};
 
    for (const key in formData) {
      if (formData[key] !== "" && formData[key] !== user[key]) {
        updatedFields[key] = formData[key];
      }
    }
 
    if (Object.keys(updatedFields).length === 0) {
      alert("No changes made");
      return;
    }
 
    const token = localStorage.getItem("token");
 
    const res = await fetch("http://localhost:3002/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
     },
      body: JSON.stringify(updatedFields),
    });
 
    if (res.ok) {
    alert("Profile updated!");
    modifyPopup(false);
    const updatedRes = await fetch(`http://localhost:3002/api/user/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const updatedUser = await updatedRes.json();
    setUser(updatedUser);
  } else {
    alert("Update failed");
  }
};
 
 
  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.95)",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 5px 30px rgba(0,0,0,0.25)",
          }}
        >
          <h1 style={{ textAlign: "center", fontSize: "32px", marginBottom: "20px" }}>
            Profile
          </h1>
 
          <p><strong>Id :</strong> {user.id}</p>
          <p><strong>Email :</strong> {user.email}</p>
          <p><strong>Firstname :</strong> {user.firstname}</p>
          <p><strong>Name :</strong> {user.name}</p>
          <p><strong>Created :</strong> {user.created_at.split("T")[0]}</p>
 
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button
              onClick={handleDelete}
              style={{
                flex: 1,
                padding: "12px",
                background: "#ff3b3b",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Delete the account
            </button>
 
            <button
              onClick={EditPopup}
              style={{
                flex: 1,
                padding: "12px",
                background: "#3b6bff",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              🖊️ Change
            </button>

            <button onClick={() => navigate("/todolist")}
            style={{
                flex: 1,
                padding: "12px",
                background: "#0a0a0aff",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}>Back to Todolist</button> 
          </div>
        </div>
      </div>
 
      {Popup && (
  <div
    style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  }}
    onClick={() => modifyPopup(false)}
  >
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        maxWidth: "90%",
       boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <h3 style={{ marginBottom: "20px", textAlign: "center" }}>Modify Profile</h3>
 
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
        <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} placeholder="Firstname" style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="New Password" style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
 
        <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
          <button type="submit" style={{ flex: 1, padding: "10px", background: "#3b6bff", color: "white", border: "none", borderRadius: "6px" }}>Save</button>
          <button type="button" onClick={() => modifyPopup(false)} style={{ flex: 1, padding: "10px", background: "#ccc", border: "none", borderRadius: "6px" }}>Cancel</button>
        </div>
      </form>
    </div>
  </div>
)}
    </>
  );
}
 
export default Profile;
 