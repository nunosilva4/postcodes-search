import React, { useState } from 'react';
import Details from './Details.js';
import '../App.css';

export default function SearchBar() { 

    const [input, setInput] = useState("");
    const [clicked, setClicked] = useState(false);
    const [toSearch, setToSearch] = useState('');

    const click = () => {
        if(!input) return
        setClicked(true);
        setToSearch(input);
    }

    return (
        <div className="SearchBar">
            <input
                value={input}
                onChange={({ target }) => setInput(target.value)}
                placeholder={"PostCode"}
                className="SearchInput"
                onKeyDown={(key) => {
                    if(key.code === 'Enter' || key.code === 'NumpadEnter'){
                        click()
                    }
                }}
            />
            <button className="SearchBtn" onClick={click}>
                Search
            </button>
            {clicked &&
                <Details postCode={toSearch} />
            }
        </div>
    )
}