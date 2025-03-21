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

        if (filters.departureDate) {
            const departureDate = new Date(filters.departureDate);
            departureDate.setHours(0, 0, 0, 0);
            filtered = filtered.filter(flight => {
                const flightDate = new Date(flight.departureTime);
                flightDate.setHours(0, 0, 0, 0);
                return flightDate.getTime() === departureDate.getTime();
            });
        }

        if (filters.arrivalDate) {
            const arrivalDate = new Date(filters.arrivalDate);
            arrivalDate.setHours(0, 0, 0, 0);
            filtered = filtered.filter(flight => {
                const flightArrivalDate = new Date(flight.arrivalTime);
                flightArrivalDate.setHours(0, 0, 0, 0);
                return flightArrivalDate.getTime() === arrivalDate.getTime();
            });
        }

        if (filters.timeFrom) {
            filtered = filtered.filter(flight => {
                const flightTime = new Date(flight.departureTime);
                const [hoursFrom, minutesFrom] = filters.timeFrom.split(':').map(Number);
                return flightTime.getHours() > hoursFrom || 
                    (flightTime.getHours() === hoursFrom && flightTime.getMinutes() >= minutesFrom);
            });
        }

        if (filters.timeTo) {
            filtered = filtered.filter(flight => {
                const flightTime = new Date(flight.departureTime);
                const [hoursTo, minutesTo] = filters.timeTo.split(':').map(Number);
                return flightTime.getHours() < hoursTo || 
                    (flightTime.getHours() === hoursTo && flightTime.getMinutes() <= minutesTo);
            });
        }

        if (filters.priceFrom || filters.priceTo) {
            filtered = filtered.filter(flight => {
                if (!priceRanges[flight.id]) return false;

                const { minPrice, maxPrice } = priceRanges[flight.id];
                return (
                    (!filters.priceFrom || filters.priceFrom <= maxPrice) &&
                    (!filters.priceTo || filters.priceTo >= minPrice)
                );
            });
        }

        setFilteredFlights(filtered);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Flights</h1>
            <div className="mb-3">
                <FlightFilter
                    departureAirports={departureAirports}
                    arrivalAirports={arrivalAirports}
                    onApplyFilter={handleFilterApply}
                />
            </div>
            <div className="row">
                {filteredFlights.map(flight => (
                    <div key={flight.id} className="col-md-4">
                        <div className="card mb-3 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Flight nr {flight.flightNumber}</h5>
                                <p className="card-text"><strong>From:</strong> {flight.departureAirport}</p>
                                <p className="card-text"><strong>To:</strong> {flight.arrivalAirport}</p>
                                <p className="card-text"><strong>Departure time:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
                                <p className="card-text"><strong>Arrival time:</strong> {new Date(flight.arrivalTime).toLocaleString()}</p>
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
