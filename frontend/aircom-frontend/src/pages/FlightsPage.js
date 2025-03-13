import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function FlightsPage() {
    const [flights, setFlights] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/api/flights")
            .then(response => response.json())
            .then(data => setFlights(data))
            .catch(error => console.error("Ошибка загрузки рейсов", error));
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Список рейсов</h1>
            <div className="row">
                {flights.map(flight => (
                    <div key={flight.id} className="col-md-4">
                        <div className="card mb-3 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Рейс {flight.flightNumber}</h5>
                                <p className="card-text"><strong>Из:</strong> {flight.departureAirport}</p>
                                <p className="card-text"><strong>В:</strong> {flight.arrivalAirport}</p>
                                <p className="card-text"><strong>Время вылета:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
                                <p className="card-text"><strong>Базовая цена:</strong> {flight.price} €</p>
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
