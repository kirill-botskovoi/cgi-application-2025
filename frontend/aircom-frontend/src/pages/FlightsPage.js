import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FlightFilter from "../components/FlightFilter";


export default function FlightsPage() {
    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [departureAirports, setDepartureAirports] = useState([]);
    const [arrivalAirports, setArrivalAirports] = useState([]);
    const [priceRanges, setPriceRanges] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/api/flights")
            .then(response => response.json())
            .then(data => {
                setFlights(data);
                setFilteredFlights(data);
                const departureAirports = [...new Set(data.map(flight => flight.departureAirport))];
                setDepartureAirports(departureAirports);
                const arrivalAirports = [...new Set(data.map(flight => flight.arrivalAirport))];
                setArrivalAirports(arrivalAirports);
                fetchPriceRanges(data);
            })
            .catch(error => console.error("Error while loading flights", error));
    }, []);

    const fetchPriceRanges = async (flights) => {
        const ranges = {};
        await Promise.all(
            flights.map(async (flight) => {
                try {
                    const response = await fetch(`http://localhost:8080/api/seats/flight/${flight.id}/price-range`);
                    const data = await response.json();
                    ranges[flight.id] = data;
                } catch (error) {
                    console.error(`Error fetching price range for flight ${flight.id}:`, error);
                }
            })
        );
        setPriceRanges(ranges);
    };

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
            <h1 className="text-center mb-4">Flights</h1>
            <FlightFilter 
                departureAirports={departureAirports} 
                arrivalAirports={arrivalAirports} 
                onApplyFilter={handleFilterApply} 
            />
            <div className="row">
                {filteredFlights.map(flight => (
                    <div key={flight.id} className="col-md-4">
                        <div className="card mb-3 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Flight nr {flight.flightNumber}</h5>
                                <p className="card-text"><strong>From:</strong> {flight.departureAirport}</p>
                                <p className="card-text"><strong>To:</strong> {flight.arrivalAirport}</p>
                                <p className="card-text"><strong>Departure time:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
                                <p className="card-text">
                                    <strong>Price range:</strong> {priceRanges[flight.id] 
                                        ? `${priceRanges[flight.id].minPrice} - ${priceRanges[flight.id].maxPrice} EUR` 
                                        : "Loading..."}
                                </p>
                                <Button 
                                    variant="primary"
                                    onClick={() => navigate(`/seats/${flight.id}`)}
                                >
                                    Check seats
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
