import { Link, Outlet } from "react-router-dom"
import Headerbar from "./Headerbar"
import Copyright from "./Copyright"
import "/node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../App.css"

export default function Layout() {
    return (
        <div>
            <div>
                <Headerbar />
            </div>
            <Link to="/homepage">Home</Link><Link to="/art">Gallery</Link><Link to="/contact">Contact</Link>
            <Outlet />
            <div><Copyright /></div>
        </div>
    )
}