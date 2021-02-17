import React from 'react';
import styles from '../style/styles.json';

export default function DetailedInformation(props) {

    let distanceToAirport = (lat, lon) => {

        let airportLat = 51.4700223;
        let airportLon = -0.4542955;
        let earthRadiusInKm = 6371;

        let distanceLat = (lat - airportLat) * Math.PI / 180;
        let distanceLon = (lon - airportLon) * Math.PI / 180;

        let radianLatAirport = airportLat * Math.PI / 180;
        let radianLatPostCode = lat * Math.PI / 180;

        let x = Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
            Math.sin(distanceLon / 2) * Math.sin(distanceLon / 2) * Math.cos(radianLatAirport) * Math.cos(radianLatPostCode);
        let resultInKm = (earthRadiusInKm * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))).toFixed(1);

        return `${resultInKm} km; ${(resultInKm / 1.609344).toFixed(1)} miles`;
    }

    return (
        <div style={styles.detailedDiv}>
            <h2>Post Code: {props.response.postcode}</h2>
            <h2>Coordinates: {props.response.latitude}, {props.response.longitude}</h2>
            <h2>Location: {props.response.admin_district}, {props.response.country}</h2>
            <h2>Distance to the Heathrow Airport:</h2>
            <h2>{distanceToAirport(props.response.latitude, props.response.longitude)}</h2>
        </div>
    )
}