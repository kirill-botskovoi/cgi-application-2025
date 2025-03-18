import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FlightFilter from "../components/FlightFilter";

export default function FlightsPage() {
    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [airports, setAirports] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/api/flights")
            .then(response => response.json())
            .then(data => {
                setFlights(data);
                setFilteredFlights(data);
                const airports = [...new Set(data.map(flight => flight.departureAirport))];
                setAirports(airports);
            })
            .catch(error => console.error("Ошибка загрузки рейсов", error));
    }, []);

    const handleFilterApply = (filters) => {
        let filtered = flights;

        if (filters.departureAirport) {
            filtered = filtered.filter(flight => flight.departureAirport === filters.departureAirport);
        }
        if (filters.arrivalAirport) {
            filtered = filtered.filter(flight => flight.arrivalAirport === filters.arrivalAirport);
        }

        if (filters.dateFrom) {
            filtered = filtered.filter(flight => new Date(flight.departureTime) >= new Date(filters.dateFrom));
        }
        if (filters.dateTo) {
            filtered = filtered.filter(flight => new Date(flight.departureTime) <= new Date(filters.dateTo));
        }

        if (filters.timeFrom) {
            filtered = filtered.filter(flight => new Date(flight.departureTime).getHours() >= new Date(`1970-01-01T${filters.timeFrom}:00`).getHours());
        }
        if (filters.timeTo) {
            filtered = filtered.filter(flight => new Date(flight.departureTime).getHours() <= new Date(`1970-01-01T${filters.timeTo}:00`).getHours());
        }

        setFilteredFlights(filtered);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Список рейсов</h1>
            <FlightFilter airports={airports} onApplyFilter={handleFilterApply} />
            <div className="row">
                {filteredFlights.map(flight => (
                    <div key={flight.id} className="col-md-4">
                        <div className="card mb-3 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Рейс {flight.flightNumber}</h5>
                                <p className="card-text"><strong>Из:</strong> {flight.departureAirport}</p>
                                <p className="card-text"><strong>В:</strong> {flight.arrivalAirport}</p>
                                <p className="card-text"><strong>Время вылета:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
                                <Button 
                                    variant="primary"
                                    onClick={() => navigate(`/seats/${flight.id}`)}
                                >
                                    Посмотреть места
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
