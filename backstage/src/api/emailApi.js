import axios from "axios"

const API_BASE_URL = "http://localhost:8101/api"

// 创建axios实例
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

// 获取所有邮件
export const getAllEmails = async () => {
    try {
        const response = await apiClient.get("/emails")
        return response.data
    } catch (error) {
        console.error("Error fetching all emails:", error)
        throw error
    }
}

// 通过ID获取邮件
export const getEmailById = async (id) => {
    try {
        const response = await apiClient.get(`/emails/${id}`)
        return response.data
    } catch (error) {
        console.error(`Error fetching email with id ${id}:`, error)
        throw error
    }
}

// 通过邮箱地址搜索
export const getEmailsByAddress = async (emailAddress) => {
    try {
        const response = await apiClient.get(`/emails/by-address?emailAddress=${encodeURIComponent(emailAddress)}`)
        return response.data
    } catch (error) {
        console.error(`Error searching emails by address ${emailAddress}:`, error)
        throw error
    }
}

// 通过客户名称搜索
export const getEmailsByCustomerName = async (customerName) => {
    try {
        const response = await apiClient.get(`/emails/by-name?customerName=${encodeURIComponent(customerName)}`)
        return response.data
    } catch (error) {
        console.error(`Error searching emails by customer name ${customerName}:`, error)
        throw error
    }
}

// 添加新邮件
export const addEmail = async (emailData) => {
    try {
        const response = await apiClient.post("/emails", emailData)
        return response.data
    } catch (error) {
        console.error("Error adding email:", error)
        throw error
    }
}

// 删除邮件
export const deleteEmail = async (id) => {
    try {
        await apiClient.delete(`/emails/${id}`)
        return true
    } catch (error) {
        console.error(`Error deleting email with id ${id}:`, error)
        throw error
    }
}

// 发送邮件给单个用户
export const sendSingleEmail = async (emailData) => {
    try {
        const response = await apiClient.post("/send-emails/single", emailData)
        return response.data
    } catch (error) {
        console.error("Error sending single email:", error)
        throw error
    }
}

// 发送邮件给多个用户
export const sendBulkEmails = async (bulkEmailData) => {
    try {
        const response = await apiClient.post("/send-emails/bulk", bulkEmailData)
        return response.data
    } catch (error) {
        console.error("Error sending bulk emails:", error)
        throw error
    }
}

// 发送邮件给所有订阅用户
export const sendToAllSubscribers = async (emailData) => {
    try {
        const response = await apiClient.post("/send-emails/all-subscribers", emailData)
        return response.data
    } catch (error) {
        console.error("Error sending emails to all subscribers:", error)
        throw error
    }
}

