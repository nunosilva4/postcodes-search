import React from 'react';
import '../App.css';

export default function DetailsCard({response}) {

    return (
        <div class="DetailsCard">
            <h2>Post Code: {response.postcode}</h2>
            <h2>Coordinates: {response.latitude}, {response.longitude}</h2>
            <h2>Location: {response.admin_district}, {response.country}</h2>
        </div>
    )
}