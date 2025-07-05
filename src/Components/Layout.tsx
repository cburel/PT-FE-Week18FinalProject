import { Link, Outlet } from "react-router-dom"
import Headerbar from "./Headerbar"
import Copyright from "./Copyright"
import "/node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../App.css"
import Sidebar from "./Sidebar"

// Layout component - handles rendering child components - usually this is called app.tsx
export default function Layout() {
    return (
        <>
            <div>
                <Headerbar />
            </div>
            <div className="container">
                <Outlet />
                <div>
                    <Sidebar />
                </div>
            </div>
            <div><Copyright /></div>
        </>
    )
}