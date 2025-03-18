import { useState, useEffect } from 'react';
import { Button, Form, Collapse, Row, Col } from 'react-bootstrap';

export default function FlightFilter({ airports, onApplyFilter }) {
    const [showFilter, setShowFilter] = useState(false);
    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');
    const [flightDurationFrom, setFlightDurationFrom] = useState(0);
    const [flightDurationTo, setFlightDurationTo] = useState(24);
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');

    const handleApply = () => {
        onApplyFilter({
            departureAirport,
            arrivalAirport,
            dateFrom,
            dateTo,
            timeFrom,
            timeTo,
            flightDurationFrom,
            flightDurationTo,
            priceFrom,
            priceTo,
        });
    };

    return (
        <div className="filter-container">
            <Button onClick={() => setShowFilter(!showFilter)}>{showFilter ? 'Скрыть фильтр' : 'Фильтр'}</Button>
            <Collapse in={showFilter}>
                <div>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group controlId="departureAirport">
                                    <Form.Label>Откуда</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={departureAirport}
                                        onChange={(e) => setDepartureAirport(e.target.value)}
                                    >
                                        <option value="">Все аэропорты</option>
                                        {airports.map((airport) => (
                                            <option key={airport} value={airport}>{airport}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="arrivalAirport">
                                    <Form.Label>Куда</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={arrivalAirport}
                                        onChange={(e) => setArrivalAirport(e.target.value)}
                                    >
                                        <option value="">Все аэропорты</option>
                                        {airports.map((airport) => (
                                            <option key={airport} value={airport}>{airport}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="dateFrom">
                                    <Form.Label>Дата вылета с</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={dateFrom}
                                        onChange={(e) => setDateFrom(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="dateTo">
                                    <Form.Label>Дата вылета до</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={dateTo}
                                        onChange={(e) => setDateTo(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="timeFrom">
                                    <Form.Label>Время вылета с</Form.Label>
                                    <Form.Control
                                        type="time"
                                        value={timeFrom}
                                        onChange={(e) => setTimeFrom(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="timeTo">
                                    <Form.Label>Время вылета до</Form.Label>
                                    <Form.Control
                                        type="time"
                                        value={timeTo}
                                        onChange={(e) => setTimeTo(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="flightDuration">
                                    <Form.Label>Общее время полета (ч)</Form.Label>
                                    <Form.Control
                                        type="range"
                                        min="0"
                                        max="24"
                                        step="1"
                                        value={flightDurationFrom}
                                        onChange={(e) => setFlightDurationFrom(e.target.value)}
                                    />
                                    <Form.Control
                                        type="range"
                                        min="0"
                                        max="24"
                                        step="1"
                                        value={flightDurationTo}
                                        onChange={(e) => setFlightDurationTo(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="priceFrom">
                                    <Form.Label>Цена от</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={priceFrom}
                                        onChange={(e) => setPriceFrom(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="priceTo">
                                    <Form.Label>Цена до</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={priceTo}
                                        onChange={(e) => setPriceTo(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button onClick={handleApply}>Применить</Button>
                    </Form>
                </div>
            </Collapse>
        </div>
    );
}
