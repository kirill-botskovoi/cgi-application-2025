import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import FlightsPage from "./pages/FlightsPage";
import PrivateRoute from "./components/PrivateRoute";
import SeatsPage from "./pages/SeatsPage";
import ConfirmPurchasePage from "./pages/ConfirmPurchasePage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flightspage" element={<FlightsPage />} />
        <Route path="/seats/:flightId" element={<SeatsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/confirm-purchase" element={<ConfirmPurchasePage />} />
      </Routes>
    </Router>
  );
}

export default App;
