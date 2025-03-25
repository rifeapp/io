"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addEmail } from "../api/emailApi"

function AddEmailPage() {
    const [formData, setFormData] = useState({
        emailAddress: "",
        customerName: "",
        subject: "",
        content: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Basic validation
        if (!formData.emailAddress || !formData.customerName) {
            setError("Email address and customer name are required.")
            return
        }

        try {
            setLoading(true)
            setError(null)

            await addEmail(formData)

            setSuccess(true)
            setFormData({
                emailAddress: "",
                customerName: "",
                subject: "",
                content: "",
            })

            // Redirect to email list after 2 seconds
            setTimeout(() => {
                navigate("/emails")
            }, 2000)
        } catch (err) {
            console.error("Error adding email:", err)
            if (err.response && err.response.data) {
                setError(err.response.data.message || "Failed to add email subscription.")
            } else {
                setError("Failed to add email subscription. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">
                        <h2 className="mb-0">Add New Email Subscription</h2>
                    </div>
                    <div className="card-body">
                        {success && (
                            <div className="alert alert-success">Email subscription added successfully! Redirecting...</div>
                        )}

                        {error && <div className="alert alert-danger">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="emailAddress" className="form-label">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="emailAddress"
                                    name="emailAddress"
                                    value={formData.emailAddress}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="customerName" className="form-label">
                                    Customer Name *
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="customerName"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="subject" className="form-label">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="content" className="form-label">
                                    Content
                                </label>
                                <textarea
                                    className="form-control"
                                    id="content"
                                    name="content"
                                    rows="4"
                                    value={formData.content}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Submitting...
                                    </>
                                ) : (
                                    "Add Subscription"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmailPage

