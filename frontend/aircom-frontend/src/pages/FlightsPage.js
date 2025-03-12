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
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Рейс {flight.flightNumber}</h5>
                                <p className="card-text">Из: {flight.departureAirport}</p>
                                <p className="card-text">В: {flight.arrivalAirport}</p>
                                <p className="card-text">Время вылета: {flight.departureTime}</p>
                                <p className="card-text">Цена: {flight.price} €</p>
                                <Button 
                                    variant="primary"
                                    onClick={() => navigate(`/seats/${flight.id}`)}
                                >
                                    Подробнее
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
