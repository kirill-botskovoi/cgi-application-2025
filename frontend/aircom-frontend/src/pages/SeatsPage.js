import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button, Form, Collapse } from "react-bootstrap";

export default function SeatsPage() {
    const { flightId } = useParams();
    const navigate = useNavigate();
    const [seats, setSeats] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [filterNearbySeats, setFilterNearbySeats] = useState(false);
    const [nearbySeatsCount, setNearbySeatsCount] = useState(2);
    const [filterWindowSeats, setFilterWindowSeats] = useState(false);
    const [recommendedSeats, setRecommendedSeats] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/seats/flight/${flightId}`)
            .then(response => response.json())
            .then(data => {
                const sortedSeats = data.sort((a, b) => {
                    if (a.rowNumber === b.rowNumber) {
                        return a.seatIndex - b.seatIndex;
                    }
                    return a.rowNumber - b.rowNumber;
                });
                setSeats(sortedSeats);
            })
            .catch(error => console.error("Ошибка загрузки мест", error));
    }, [flightId]);
    

    const handleSeatClick = (seat) => {
        setSelectedSeat(seat);
    };

    const handleAddSeat = () => {
        if (selectedSeat && !selectedSeats.includes(selectedSeat)) {
            setSelectedSeats([...selectedSeats, selectedSeat]);
        }
    };

    const handlePurchase = () => {
        navigate("/confirm-purchase", { state: { seats: selectedSeats } });
    };

    const groupedSeats = seats.reduce((acc, seat) => {
        acc[seat.rowNumber] = acc[seat.rowNumber] || [];
        acc[seat.rowNumber].push(seat);
        return acc;
    }, {});

    const maxSeatsInRow = Math.max(...seats.map(seat => seat.seatIndex)) + 1;

    const handleApplyFilter = () => {
        let filteredRecommendations = [];

        if (filterNearbySeats) {
            Object.values(groupedSeats).forEach((row) => {
                const freeSeats = row.filter(seat => !seat.isOccupied);
                for (let i = 0; i <= freeSeats.length - nearbySeatsCount; i++) {
                    const group = freeSeats.slice(i, i + nearbySeatsCount);
                    const isConsecutive = group.every((seat, index, arr) =>
                        index === 0 || seat.seatIndex === arr[index - 1].seatIndex + 1
                    );
                    if (isConsecutive) {
                        filteredRecommendations.push(group);
                    }
                }
            });
        }

        if (filterWindowSeats) {
            // Рекомендация оконных мест (первое и последнее место)
            Object.values(groupedSeats).forEach((row) => {
                const firstSeat = row.find(seat => seat.seatIndex === 1 && !seat.isOccupied);
                const lastSeat = row.find(seat => seat.seatIndex === maxSeatsInRow - 1 && !seat.isOccupied);
                if (firstSeat) filteredRecommendations.push([firstSeat]);
                if (lastSeat) filteredRecommendations.push([lastSeat]);
            });
        }

        setRecommendedSeats(filteredRecommendations);
    };

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Plane seat map</h1>

            <div className="mb-4">
                <Button onClick={() => setShowFilter(!showFilter)}>
                    {showFilter ? "Hide recommendations filter" : "Show recommendations filter"}
                </Button>
                <Collapse in={showFilter}>
                    <div className="mt-3">
                        <Form>
                            <Form.Check
                                type="checkbox"
                                label="Find nearby seats"
                                checked={filterNearbySeats}
                                onChange={() => setFilterNearbySeats(!filterNearbySeats)}
                            />
                            {filterNearbySeats && (
                                <Form.Group controlId="nearbySeatsCount" className="mt-2">
                                    <Form.Label>How many seats do you want nearby?</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        max={maxSeatsInRow}
                                        value={nearbySeatsCount}
                                        onChange={(e) => setNearbySeatsCount(parseInt(e.target.value))}
                                    />
                                </Form.Group>
                            )}
                            <Form.Check
                                type="checkbox"
                                label="Find window seats"
                                checked={filterWindowSeats}
                                onChange={() => setFilterWindowSeats(!filterWindowSeats)}
                            />
                            <Button className="mt-3" variant="primary" onClick={handleApplyFilter}>
                                Apply
                            </Button>
                        </Form>
                    </div>
                </Collapse>
            </div>

            {recommendedSeats.length > 0 && (filterNearbySeats || filterWindowSeats) && (
                <Card className="mb-4">
                    <Card.Body>
                        <h5>Recommended seats</h5>
                        <ul>
                            {recommendedSeats.map((seatsGroup, index) => (
                                <li key={index}>
                                    {seatsGroup.map(seat => (
                                        <span key={seat.id}>
                                            {seat.rowNumber}{String.fromCharCode(65 + seat.seatIndex)}{" "}
                                        </span>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    </Card.Body>
                </Card>
            )}

            <Row>
                <Col md={8}>
                    {Object.keys(groupedSeats).map(row => (
                        <div key={row} className="d-flex mb-1">
                            {groupedSeats[row].map(seat => {
                                const isSelected = selectedSeats.includes(seat);
                                return (
                                    <div
                                        key={seat.id}
                                        className={`seat ${seat.isOccupied ? "bg-danger" : isSelected ? "bg-warning" : "bg-success"}`}
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
                                );
                            })}
                        </div>
                    ))}
                </Col>
                <Col md={4}>
                    {selectedSeat && (
                        <Card className="mb-3">
                            <Card.Body>
                                <h5>Seat Details</h5>
                                <p><strong>Row:</strong> {selectedSeat.rowNumber}</p>
                                <p><strong>Seat index:</strong> {selectedSeat.rowNumber}{String.fromCharCode(65 + selectedSeat.seatIndex)}</p>
                                <p><strong>Class:</strong> {selectedSeat.seatClass}</p>
                                <p><strong>Price:</strong> {selectedSeat.price.toFixed(2)} €</p>
                                <p><strong>Status:</strong> {selectedSeat.isOccupied ? "Occupied" : "Free"}</p>
                                {!selectedSeat.isOccupied && (
                                    <Button variant="primary" onClick={handleAddSeat}>Select</Button>
                                )}
                            </Card.Body>
                        </Card>
                    )}
                    {selectedSeats.length > 0 && (
                        <Card>
                            <Card.Body>
                                <h5>Selected seats</h5>
                                <ul>
                                    {selectedSeats.map(seat => (
                                        <li key={seat.id}>{seat.rowNumber}{String.fromCharCode(65 + seat.seatIndex)} - {seat.price.toFixed(2)} €</li>
                                    ))}
                                </ul>
                                <Button variant="success" onClick={handlePurchase}>Purchase tickets</Button>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
