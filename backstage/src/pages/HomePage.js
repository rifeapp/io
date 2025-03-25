import { Link } from "react-router-dom"

function HomePage() {
    return (
        <div className="jumbotron">
            <h1 className="display-4">Email Subscription Management</h1>
            <p className="lead">Manage customer email subscriptions with this admin dashboard.</p>
            <hr className="my-4" />
            <p>
                You can view all subscribed emails, add new subscriptions, search for specific customers, and manage your email
                list.
            </p>
            <div className="d-flex gap-2">
                <Link to="/emails" className="btn btn-primary btn-lg">
                    View All Emails
                </Link>
                <Link to="/add" className="btn btn-success btn-lg">
                    Add New Subscription
                </Link>
                <Link to="/search" className="btn btn-info btn-lg">
                    Search Subscriptions
                </Link>
            </div>
        </div>
    )
}

export default HomePage

