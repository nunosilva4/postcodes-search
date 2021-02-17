import React, { useState, useEffect } from 'react';
import styles from '../style/styles.json';
import DetailedInformation from './DetailedInformation.jsx';

export default function Details(props) {

    const [response, setResponse] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [postCodes, setPostCodes] = useState([]);
    const [lastCode, setLastCode] = useState('');

    useEffect(() => {
        doGet();
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

    const LastSearched = (props) => {
        return (
            <div style={styles.lastSearchDiv}>
                {props.postCodes.map((item, i) => {
                    return <button
                        key={i}
                        style={styles.lastSearchBtn}
                        onClick={() => checkRepeating(item)}>{item}
                    </button>
                })}
            </div>
        )
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
        <div style={styles.detailsContainer}>
            <h2>Last searches:</h2>
            <LastSearched postCodes={postCodes} />
            {
                error &&
                <h1 style={styles.error}>Invalid Post Code</h1>
                ||
                loaded &&
                <DetailedInformation response={response} />
                ||
                <h1>LOADING</h1>
            }
        </div>
    )
}