let sqlite3 = require('sqlite3').verbose();

class Flight {
    constructor(flightDestination, flightDeparture, flightArrival, flightAirline, flightPrice) {
        this.flightDestination = flightDestination;
        this.flightDeparture = null;
        this.flightArrival = null;
        this.flightAirline = null;
        this.flightPrice = null;
    }

    displayAvailableFlight(destination) {
        debugger;
        let flightsDB = new sqlite3.Database('flights.db');
        let query = 'SELECT departure Departure, arrival Arrival, airline Airline, price Price FROM flight WHERE destination = ?';
        flightsDB.each(query, ['Sevilla'], (err, row) => {
            if (err) {
                throw err;
            }
            Flight.currentFlight = new Flight(Depature, Arrival, Airline, Price);
            console.log('${row.Departure} ${row.Arrival} ${row.Airline} ${row.Price}');
        });
        flightsDB.close;
    }
}
