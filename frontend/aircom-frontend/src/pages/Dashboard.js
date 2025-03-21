import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
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

      axios
        .get("http://localhost:8080/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setBookings(res.data))
        .catch((err) => console.error("Error fetching bookings:", err));

  }, [navigate]);

  const handleReset = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:8080/api/flights/reset", {
        headers: { Authorization: `Bearer ${token}` },
      });

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
        about your profile, but this is only to be implemented!
      </p>

      <h3>Your Bookings:</h3>
      {bookings.length > 0 ? (
        <ul className="list-group mb-3">
          {bookings.map((booking, index) => (
            <li key={index} className="list-group-item">
              <p><strong>Flight:</strong> {booking.flightNumber}</p>
              <p><strong>Seat:</strong> Row {booking.seatRow}, Index {booking.seatIndex}</p>
              <p><strong>Class:</strong> {booking.seatClass}</p>
              <p><strong>Price:</strong> €{booking.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}

      <div className="mb-3">
        <button
          className="btn btn-danger"
          onClick={handleReset}
        >
          Delete Flights
        </button>
      </div>

      <div className="mb-3">
        <button
          className="btn btn-success"
          onClick={handleFetch}
        >
          Fetch New Flights
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
