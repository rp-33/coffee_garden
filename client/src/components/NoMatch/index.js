import React from 'react';
import './style.css';

const NoMatch = ()=>(
    <div className="nomatch">
        <div className="container">
            <div className="header">
                <div className="red"></div>
                <div className="yellow"></div>
                <div className="green"></div>
            </div>
            <div className="body">
                <h1>404</h1>
            </div>
        </div>
    </div>
)

export default NoMatch;