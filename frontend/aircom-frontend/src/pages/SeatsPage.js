import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
                        <div className={`card mb-3 ${seat.occupied ? "bg-danger text-white" : "bg-success text-white"}`}>
                            <div className="card-body">
                                <h5 className="card-title">Место {seat.seatNumber}</h5>
                                <p className="card-text">Класс: {seat.seatClass}</p>
                                <p className="card-text">
                                    Статус: {seat.occupied ? "Занято" : "Свободно"}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
