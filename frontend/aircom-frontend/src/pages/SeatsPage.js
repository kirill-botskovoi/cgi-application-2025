import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

export default function SeatsPage() {
    const { flightId } = useParams();
    const [seats, setSeats] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/seats/flight/${flightId}`)
            .then(response => response.json())
            .then(data => setSeats(data))
            .catch(error => console.error("Ошибка загрузки мест", error));
    }, [flightId]);

    const handleSeatClick = (seat) => {
        setSelectedSeat(seat);
    };

    const groupedSeats = seats.reduce((acc, seat) => {
        acc[seat.rowNumber] = acc[seat.rowNumber] || [];
        acc[seat.rowNumber].push(seat);
        return acc;
    }, {});

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">План салона самолета</h1>
            <Row>
                <Col md={8}>
                    {Object.keys(groupedSeats).map(row => (
                        <div key={row} className="d-flex mb-1">
                            {groupedSeats[row].map(seat => (
                                <div 
                                    key={seat.id} 
                                    className={`seat ${seat.isOccupied ? "bg-danger" : "bg-success"}`} 
                                    onClick={() => handleSeatClick(seat)}
                                    style={{
                                        width: "25px", 
                                        height: "25px", 
                                        margin: "5px", 
                                        display: "flex", 
                                        alignItems: "center", 
                                        justifyContent: "center", 
                                        color: "white", 
                                        cursor: "pointer",
                                        borderRadius: "5px"
                                    }}
                                >
                                    {seat.rowNumber}{String.fromCharCode(65 + seat.seatIndex)}
                                </div>
                            ))}
                        </div>
                    ))}
                </Col>
                <Col md={4}>
                    {selectedSeat && (
                        <Card>
                            <Card.Body>
                                <h5>Детали места</h5>
                                <p><strong>Ряд:</strong> {selectedSeat.rowNumber}</p>
                                <p><strong>Место:</strong> {selectedSeat.rowNumber}{String.fromCharCode(65 + selectedSeat.seatIndex)}</p>
                                <p><strong>Класс:</strong> {selectedSeat.seatClass}</p>
                                <p><strong>Цена:</strong> {selectedSeat.price.toFixed(2)} €</p>
                                <p><strong>Статус:</strong> {selectedSeat.isOccupied ? "Занято" : "Свободно"}</p>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
}