import { useState } from "react"
import { sendToAllSubscribers } from "../api/emailApi"

function SendToAllPage() {
    const [formData, setFormData] = useState({
        subject: "",
        htmlContent: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [sentCount, setSentCount] = useState(0)

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
        if (!formData.subject || !formData.htmlContent) {
            setError("Subject and content are required.")
            return
        }

        // Confirm before sending to all
        if (!window.confirm("Are you sure you want to send this email to ALL subscribers? This action cannot be undone.")) {
            return
        }

        try {
            setLoading(true)
            setError(null)

            const response = await sendToAllSubscribers({
                subject: formData.subject,
                htmlContent: formData.htmlContent,
            })

            setSuccess(true)
            setSentCount(response.sentCount)
            setFormData({
                subject: "",
                htmlContent: "",
            })

            // Reset success message after 5 seconds
            setTimeout(() => {
                setSuccess(false)
            }, 5000)
        } catch (err) {
            console.error("Error sending emails to all subscribers:", err)
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
                    <div className="card-header bg-white d-flex justify-content-between align-items-center">
                        <h2 className="mb-0">Send Email to All Subscribers</h2>
                        <span className="badge bg-warning text-dark">Use with caution</span>
                    </div>
                    <div className="card-body">
                        <div className="alert alert-warning mb-4">
                            <i className="bi bi-exclamation-triangle me-2"></i>
                            This will send the email to <strong>ALL</strong> subscribers in your database. Please use this feature
                            carefully.
                        </div>

                        {success && (
                            <div className="alert alert-success">
                                <i className="bi bi-check-circle me-2"></i>
                                Emails sent successfully! {sentCount} email(s) were sent to all subscribers.
                            </div>
                        )}

                        {error && (
                            <div className="alert alert-danger">
                                <i className="bi bi-exclamation-triangle me-2"></i>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
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

                            <button type="submit" className="btn btn-danger" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Sending to All Subscribers...
                                    </>
                                ) : (
                                    "Send to All Subscribers"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendToAllPage

