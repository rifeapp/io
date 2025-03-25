import { useState, useEffect } from "react"
import { getAllEmails, sendBulkEmails } from "../api/emailApi"

function SendBulkEmailPage() {
    const [subscribers, setSubscribers] = useState([])
    const [selectedEmails, setSelectedEmails] = useState([])
    const [formData, setFormData] = useState({
        subject: "",
        htmlContent: "",
    })
    const [loading, setLoading] = useState(false)
    const [fetchLoading, setFetchLoading] = useState(true)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [sentCount, setSentCount] = useState(0)

    useEffect(() => {
        fetchSubscribers()
    }, [])

    const fetchSubscribers = async () => {
        try {
            setFetchLoading(true)
            const data = await getAllEmails()
            setSubscribers(data)
            setFetchLoading(false)
        } catch (err) {
            setError("Failed to fetch subscribers. Please try again later.")
            setFetchLoading(false)
            console.error("Error fetching subscribers:", err)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleCheckboxChange = (email) => {
        if (selectedEmails.includes(email)) {
            setSelectedEmails(selectedEmails.filter((e) => e !== email))
        } else {
            setSelectedEmails([...selectedEmails, email])
        }
    }

    const handleSelectAll = () => {
        if (selectedEmails.length === subscribers.length) {
            setSelectedEmails([])
        } else {
            setSelectedEmails(subscribers.map((sub) => sub.emailAddress))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Basic validation
        if (!formData.subject || !formData.htmlContent) {
            setError("Subject and content are required.")
            return
        }

        if (selectedEmails.length === 0) {
            setError("Please select at least one recipient.")
            return
        }

        try {
            setLoading(true)
            setError(null)

            const response = await sendBulkEmails({
                toEmails: selectedEmails,
                subject: formData.subject,
                htmlContent: formData.htmlContent,
            })

            setSuccess(true)
            setSentCount(response.sentCount)
            setFormData({
                subject: "",
                htmlContent: "",
            })
            setSelectedEmails([])

            // Reset success message after 5 seconds
            setTimeout(() => {
                setSuccess(false)
            }, 5000)
        } catch (err) {
            console.error("Error sending bulk emails:", err)
            if (err.response && err.response.data) {
                setError(err.response.data.error || "Failed to send emails.")
            } else {
                setError("Failed to send emails. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-10">
                <div className="card">
                    <div className="card-header bg-white">
                        <h2 className="mb-0">Send Email to Multiple Recipients</h2>
                    </div>
                    <div className="card-body">
                        {success && (
                            <div className="alert alert-success">
                                <i className="bi bi-check-circle me-2"></i>
                                Emails sent successfully! {sentCount} email(s) were sent.
                            </div>
                        )}

                        {error && (
                            <div className="alert alert-danger">
                                <i className="bi bi-exclamation-triangle me-2"></i>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="form-label">Select Recipients *</label>
                                <div className="d-flex justify-content-between mb-2">
                                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={handleSelectAll}>
                                        {selectedEmails.length === subscribers.length ? "Deselect All" : "Select All"}
                                    </button>
                                    <span className="badge bg-primary">{selectedEmails.length} selected</span>
                                </div>

                                {fetchLoading ? (
                                    <div className="text-center p-3">
                                        <div className="spinner-border text-primary"></div>
                                        <p className="mt-2">Loading subscribers...</p>
                                    </div>
                                ) : (
                                    <div className="checkbox-container">
                                        {subscribers.length === 0 ? (
                                            <p className="text-muted">No subscribers found.</p>
                                        ) : (
                                            subscribers.map((subscriber) => (
                                                <div className="checkbox-item form-check" key={subscriber.id}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`subscriber-${subscriber.id}`}
                                                        checked={selectedEmails.includes(subscriber.emailAddress)}
                                                        onChange={() => handleCheckboxChange(subscriber.emailAddress)}
                                                    />
                                                    <label className="form-check-label" htmlFor={`subscriber-${subscriber.id}`}>
                                                        {subscriber.customerName} ({subscriber.emailAddress})
                                                    </label>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="subject" className="form-label">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Email subject"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="htmlContent" className="form-label">
                                    Email Content (HTML) *
                                </label>
                                <div className="editor-container">
                  <textarea
                      className="form-control"
                      id="htmlContent"
                      name="htmlContent"
                      rows="10"
                      value={formData.htmlContent}
                      onChange={handleChange}
                      placeholder="<div>Your HTML email content here...</div>"
                      required
                  ></textarea>
                                </div>
                                <small className="text-muted">You can use HTML tags to format your email content.</small>
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={loading || selectedEmails.length === 0}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Sending...
                                    </>
                                ) : (
                                    "Send Emails"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendBulkEmailPage

