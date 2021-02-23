import React, { useState, useEffect } from 'react';
import DetailsCard from './DetailsCard.js';
import '../App.css';
import LastSearched from './LastSearched.js';

export default function Details(props) {

    const [response, setResponse] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [postCodes, setPostCodes] = useState([]);
    const [lastCode, setLastCode] = useState('');

    useEffect(() => {
        doGet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.postCode]);

    const updateList = (code) => {
        setLastCode(code);
        if (postCodes.length === 3) {
            postCodes.shift();
        }
        setPostCodes([...postCodes, code]);
    }

    const checkRepeating = (postCode) => {
        if (!(postCode === lastCode)) {
            doGet(postCode);
        }
    }

    const doGet = (postCode) => {
        setError(false);
        let code = postCode ? postCode : props.postCode;
        updateList(code);
        fetch(`http://api.postcodes.io/postcodes/${code}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error();
                }
                return response;
            })
            .then(response => response.json())
            .then(json => {
                setResponse(json.result);
                setLoaded(true);
            }, () => {
                setLoaded(false);
                setError(true);
            })
    }

    return (
        <div className="Details">
            <h2>Last searches:</h2>
            <LastSearched postCodes={postCodes} check={checkRepeating}/>
            {
                error ? 
                <h1 className="Error">Invalid Post Code</h1> 
                :
                loaded ?
                <DetailsCard response={response} />
                :
                <h1>LOADING</h1>
            }
        </div>
    )
}