import { Link, Outlet } from "react-router-dom"
import Headerbar from "./Headerbar"
import Copyright from "./Copyright"
import "/node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../App.css"
import Sidebar from "./Sidebar"

export default function Layout() {
    return (
        <div>
            <div>
                <Headerbar />
            </div>
            <Outlet />
            <div>
                <Sidebar />
            </div>
            <div><Copyright /></div>
        </div>
    )
}