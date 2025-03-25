import { Link, useLocation } from "react-router-dom"

function MainNavBar() {
    const location = useLocation()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Rife Admin
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname.startsWith("/email") ? "active" : ""}`} to="/email">
                                Email Management
                            </Link>
                        </li>
                        {/* 其他主导航项可以在这里添加 */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default MainNavBar

