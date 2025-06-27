import { Link, Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <div>
            <Link to="/homepage">Home</Link><Link to="/art">Gallery</Link><Link to="/contact">Contact</Link>
            <Outlet />
        </div >
    )
}