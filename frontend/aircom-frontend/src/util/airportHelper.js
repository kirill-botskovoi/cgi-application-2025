let airportMap = {};

async function loadAirports() {
    const response = await fetch("/airport-iata.json");
    const airports = await response.json();
    airportMap = Object.fromEntries(airports.map(a => [a.iata, a.name]));
}

export async function getAirportName(iataCode) {
    if (Object.keys(airportMap).length === 0) {
        await loadAirports();
    }
    return airportMap[iataCode] || iataCode;
}
