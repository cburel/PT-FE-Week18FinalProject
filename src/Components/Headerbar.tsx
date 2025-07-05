import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Headerbar() {

    return (
        <div className="headerbar">
            <div className="headerbar-display">
                <div><Link to="/homepage">Home</Link></div>
                <div><Link to="/art">Gallery</Link></div>
                <div><Link to="/contact">Contact</Link></div>
            </div>
        </div>
    )
}