"use client"

import { useState } from "react"
import EmailCard from "../components/EmailCard"
import { getEmailsByAddress, getEmailsByCustomerName, deleteEmail } from "../api/emailApi"

function SearchPage() {
    const [searchType, setSearchType] = useState("emailAddress")
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searched, setSearched] = useState(false)

    const handleSearch = async (e) => {
        e.preventDefault()

        if (!searchTerm.trim()) {
            setError("Please enter a search term")
            return
        }

        try {
            setLoading(true)
            setError(null)

            let data
            if (searchType === "emailAddress") {
                data = await getEmailsByAddress(searchTerm)
            } else {
                data = await getEmailsByCustomerName(searchTerm)
            }

            setResults(data)
            setSearched(true)
        } catch (err) {
            console.error("Error searching emails:", err)
            setError("Failed to search emails. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this email subscription?")) {
            try {
                await deleteEmail(id)
                // Remove the deleted email from the results
                setResults(results.filter((email) => email.id !== id))
            } catch (err) {
                setError("Failed to delete email. Please try again.")
                console.error("Error deleting email:", err)
            }
        }
    }

    return (
        <div>
            <h2 className="mb-4">Search Email Subscriptions</h2>

            <div className="card mb-4">
                <div className="card-body">
                    <form onSubmit={handleSearch} className="search-form">
                        <div className="row g-3">
                            <div className="col-md-4">
                                <label htmlFor="searchType" className="form-label">
                                    Search By
                                </label>
                                <select
                                    className="form-select"
                                    id="searchType"
                                    value={searchType}
                                    onChange={(e) => setSearchType(e.target.value)}
                                >
                                    <option value="emailAddress">Email Address</option>
                                    <option value="customerName">Customer Name</option>
                                </select>
                            </div>

                            <div className="col-md-8">
                                <label htmlFor="searchTerm" className="form-label">
                                    Search Term
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="searchTerm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder={searchType === "emailAddress" ? "Enter email address..." : "Enter customer name..."}
                                />
                            </div>
                        </div>

                        <div className="mt-3">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Searching...
                                    </>
                                ) : (
                                    "Search"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {searched && (
                <div className="mt-4">
                    <h3>Search Results</h3>

                    {results.length === 0 ? (
                        <div className="alert alert-info">No results found.</div>
                    ) : (
                        <div className="row">
                            {results.map((email) => (
                                <div className="col-md-6 col-lg-4" key={email.id}>
                                    <EmailCard email={email} onDelete={handleDelete} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchPage

