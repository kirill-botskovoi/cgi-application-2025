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

    axios
      .get("http://localhost:8080/secured/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessage(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleReset = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:8080/api/flights/reset", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // await axios.post(
      //   "http://localhost:8080/api/flights/fetch",
      //   {},
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );

      alert("Data from tables successfully deleted!");
    } catch (error) {
      console.error("Error while deleting data", error);
      alert("Error while deleting data");
    }
  };

  const handleFetch = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8080/api/flights/fetch",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("New data succesfully fetched!");
    } catch (error) {
      console.error("Error while fetching data", error);
      alert("Error while fetching data");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>

      <p>Hello, {message || "(name)"}!</p>
      <p>
        This is dashboard, and in the future this page could contain information
        about your profile and your tickets, but this is only to be implemented!
      </p>

      <div className="mb-3">
        <button
          className="btn btn-danger"
          onClick={handleReset}
          style={{ marginTop: "20px" }}
        >
          Delete Flights
        </button>
      </div>

      <div className="mb-3">
        <button
          className="btn btn-success"
          onClick={handleFetch}
          style={{ marginTop: "20px" }}
        >
          Fetch New Flights
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
