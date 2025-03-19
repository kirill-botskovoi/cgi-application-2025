import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Card, Button, Form, Alert } from "react-bootstrap";

export default function ConfirmPurchasePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [seatsDetails, setSeatsDetails] = useState([]);
    const [email, setEmail] = useState("");
    const [alertMessage, setAlertMessage] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setAlertMessage("You have to authorize to buy tickets.");
            return;
        }

        fetch("http://localhost:8080/api/users/me", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => setEmail(data.email))
        .catch(error => console.error("Error loading user data", error));

        const fetchSeatDetails = async () => {
            if (!location.state || !location.state.seats) return;

            const apiSeats = await Promise.all(
                location.state.seats.map(seat =>
                    fetch(`http://localhost:8080/api/seats/${seat.id}`)
                        .then(response => response.json())
                )
            );
        
            const combinedSeats = apiSeats.map(apiSeat => {
                const originalSeat = location.state.seats.find(
                    seat => seat.rowNumber === apiSeat.rowNumber && seat.seatIndex === apiSeat.seatIndex
                );
                return { ...apiSeat, id: originalSeat?.id };
            });
        
            console.log("United data:", combinedSeats);
        
            setSeatsDetails(combinedSeats);
        };

        fetchSeatDetails();
    }, [location.state]);

    const handleConfirmPurchase = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setAlertMessage("You have to authorize to buy tickets.");
                return;
            }

            if (seatsDetails.length === 0) {
                setAlertMessage("Error: Seat data was not loaded");
                return;
            }

            console.log(seatsDetails)

            for (let i = 0; i < seatsDetails.length; i++) {
                const seat = seatsDetails[i];
    
                const response = await fetch("http://localhost:8080/api/bookings", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(seat.id)
                });
    
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error booking seat ${seat.rowNumber}${String.fromCharCode(65 + seat.seatIndex)}: ${errorText}`);
                }
            }

            setAlertMessage("Success! Tickets are sent to email");
            setTimeout(() => navigate("/"), 3000);
        } catch (error) {
            console.error("Error while booking", error);
            setAlertMessage(error.message || "Error while booking");
        }
    };

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Purchase confirmation</h1>
            {alertMessage && <Alert variant="info">{alertMessage}</Alert>}
            <Card className="mb-3">
                <Card.Body>
                    <h5>Your Tickets</h5>
                    <ul>
                        {seatsDetails.map(seat => (
                            <li key={seat.id}>
                                {seat.rowNumber}{String.fromCharCode(65 + seat.seatIndex)} - {seat.price.toFixed(2)} € ({seat.seatClass})
                            </li>
                        ))}
                    </ul>
                    <Form.Group>
                        <Form.Label>Your Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="success" className="mt-3" onClick={handleConfirmPurchase}>
                        Confirm
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}
