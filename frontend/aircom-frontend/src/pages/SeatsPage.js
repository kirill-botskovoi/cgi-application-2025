import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";

export default function SeatsPage() {
    const { flightId } = useParams();
    const [seats, setSeats] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/seats/flight/${flightId}`)
            .then(response => response.json())
            .then(data => setSeats(data))
            .catch(error => console.error("Ошибка загрузки мест", error));
    }, [flightId]);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Места в самолете</h1>
            <div className="row">
                {seats.map(seat => (
                    <div key={seat.id} className="col-md-3">
                        <Card className={`mb-3 ${seat.occupied ? "bg-danger text-white" : "bg-success text-white"}`}>
                            <Card.Body>
                                <h5 className="card-title">Место {seat.seatNumber}</h5>
                                <p className="card-text"><strong>Класс:</strong> {seat.seatClass}</p>
                                <p className="card-text"><strong>Цена:</strong> {seat.price.toFixed(2)} €</p>
                                <p className="card-text">
                                    <strong>Статус:</strong> {seat.occupied ? "Занято" : "Свободно"}
                                </p>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
