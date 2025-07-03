import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Headerbar() {
    return (
        <>
            <ul>
                <li><Link to="/homepage">Home</Link></li>
                <li><Link to="/art">Gallery</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </>
    )
}