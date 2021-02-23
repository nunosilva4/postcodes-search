import React from 'react';
import '../App.css';

export default function LastSearched(props) {
    return (
        <div className="LastSearch">
            {props.postCodes.map((item, i) => {
                return <button
                    key={i}
                    className="LastSearchBtn"
                    onClick={() => props.check(item)}>{item}
                </button>
            })}
        </div>
    )
}