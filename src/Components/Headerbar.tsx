import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Headerbar() {
    const [className, setClassName] = useState('active');
    const toggleHeaderbar = () => {
        setClassName(prevClass => prevClass === 'active' ? 'hidden' : 'active')
    }

    return (
        <div className="headerbar">
            <button className="headerbar-toggle btn headerbar-btn btn-secondary" onClick={toggleHeaderbar}>X</button>
            <div className={`headerbar-nav ${className}`}>
                <div className="headerbar-display">
                    <div><Link to="/homepage">Home</Link></div>
                    <div><Link to="/art">Gallery</Link></div>
                    <div><Link to="/contact">Contact</Link></div>
                </div>
            </div>
        </div>
    )
}