import { Link, useLocation } from "react-router-dom"

function EmailNavBar() {
    const location = useLocation()

    return (
        <nav className="navbar navbar-expand-lg secondary-navbar">
            <div className="container">
        <span className="navbar-text me-4">
          <i className="bi bi-envelope me-2"></i>
          Email Management
        </span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#emailNavbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="emailNavbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === "/email" || location.pathname === "/email/list" ? "active" : ""}`}
                                to="/email/list"
                            >
                                All Subscriptions
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/email/add" ? "active" : ""}`} to="/email/add">
                                Add Subscription
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/email/search" ? "active" : ""}`} to="/email/search">
                                Search
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/email/send" ? "active" : ""}`} to="/email/send">
                                Send Email
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === "/email/send-bulk" ? "active" : ""}`}
                                to="/email/send-bulk"
                            >
                                Bulk Send
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === "/email/send-all" ? "active" : ""}`}
                                to="/email/send-all"
                            >
                                Send to All
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default EmailNavBar

