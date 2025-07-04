import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const [className, setClassName] = useState('active');
    const toggleSidebar = () => {
        setClassName(prevClass => prevClass === 'active' ? 'hidden' : 'active')
    }

    return (
        <div className="sidebar">
            <div className="sidebar-w">
                <div className="sidebar-display">
                    <button className="sidebar-toggle btn btn-secondary" onClick={toggleSidebar}>X</button>
                    <ul className={`sidebar-nav ${className}`}>
                        <li className="sidebar-item"><Link to="">LinkedIn</Link></li>
                        <li className="sidebar-item"><Link to="">GitHub</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}