import React, { useState } from 'react';
import styles from '../style/styles.json';
import Details from './Details.jsx';

export default function SearchBar() {

    const [input, setInput] = useState("");
    const [clicked, setClicked] = useState(false);
    const [toSearch, setToSearch] = useState('');

    let click = () => {
        setClicked(true);
        setToSearch(input);
    }

    return (
        <div style={styles.searchBarContainer}>
            <input
                value={input}
                onChange={({ target }) => setInput(target.value)}
                placeholder={"PostCode"}
                style={styles.searchInput}
            />
            <button style={styles.searchBtn} onClick={click}>
                Search
            </button>
            {clicked &&
                <Details postCode={toSearch} />
            }
        </div>
    )
}