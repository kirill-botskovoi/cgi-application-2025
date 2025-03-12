import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    axios.get("http://localhost:8080/secured/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setMessage(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <p>{message || "Loading..."}</p>
    </div>
  );
}

export default Dashboard;
