import { useState } from 'react';
import { Button, Form, Collapse, Row, Col } from 'react-bootstrap';

export default function FlightFilter({ departureAirports, arrivalAirports, onApplyFilter }) {
    const [showFilter, setShowFilter] = useState(false);
    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');

    const handleApply = () => {
        onApplyFilter({
            departureAirport,
            arrivalAirport,
            departureDate,
            arrivalDate,
            timeFrom,
            timeTo,
            priceFrom,
            priceTo,
        });
    };

    return (
        <div className="filter-container">
            <Button onClick={() => setShowFilter(!showFilter)}>
                {showFilter ? 'Hide' : 'Show filter'}
            </Button>
            <Collapse in={showFilter}>
                <div>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group controlId="departureAirport">
                                    <Form.Label>From</Form.Label>
                                    <Form.Control as="select" value={departureAirport} onChange={(e) => setDepartureAirport(e.target.value)}>
                                        <option value="">All airports</option>
                                        {departureAirports.map(airport => <option key={airport} value={airport}>{airport}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="arrivalAirport">
                                    <Form.Label>To</Form.Label>
                                    <Form.Control as="select" value={arrivalAirport} onChange={(e) => setArrivalAirport(e.target.value)}>
                                        <option value="">All airports</option>
                                        {arrivalAirports.map(airport => <option key={airport} value={airport}>{airport}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="departureDate">
                                    <Form.Label>Departure date</Form.Label>
                                    <Form.Control type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="arrivalDate">
                                    <Form.Label>Arrival date</Form.Label>
                                    <Form.Control type="date" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="timeFrom">
                                    <Form.Label>Departure time from</Form.Label>
                                    <Form.Control type="time" value={timeFrom} onChange={(e) => setTimeFrom(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="timeTo">
                                    <Form.Label>Departure time until</Form.Label>
                                    <Form.Control type="time" value={timeTo} onChange={(e) => setTimeTo(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="priceFrom">
                                    <Form.Label>Price from</Form.Label>
                                    <Form.Control type="number" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="priceTo">
                                    <Form.Label>Price until</Form.Label>
                                    <Form.Control type="number" value={priceTo} onChange={(e) => setPriceTo(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button onClick={handleApply} className="mt-3">Apply</Button>
                    </Form>
                </div>
            </Collapse>
        </div>
    );
}
