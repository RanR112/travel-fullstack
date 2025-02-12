import axios from "axios";

const API_URL = "http://localhost:5000"; // URL backend

// Fungsi untuk mendapatkan data pembeli
export const getPembeli = async () => {
    try {
        const response = await axios.get(`${API_URL}/pembeli`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

// Fungsi untuk menambahkan data pembeli
export const addPembeli = async (newData) => {
    try {
        const response = await axios.post(`${API_URL}/pembeli`, newData);
        return response.data;
    } catch (error) {
        console.error("Error adding data:", error);
        throw error;
    }
};

// Fungsi untuk mendapatkan data transaksi
export const getTransaksi = async () => {
    try {
        const response = await axios.get(`${API_URL}/transaksi`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

// Fungsi untuk menambahkan data transaksi
export const addTransaksi = async (newData) => {
    try {
        console.log("Data yang dikirim:", newData); // Log data
        const response = await axios.post(`${API_URL}/transaksi`, newData);
        return response.data;
    } catch (error) {
        console.error("Error adding transaksi:", error.response?.data || error); // Log error respons
        throw error;
    }
};

export const updateTransaksi = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/transaksi/${id}`, data); // Sesuaikan URL endpoint
        return response.data;
    } catch (error) {
        console.error("Error updating transaksi:", error);
        throw error;
    }
};


// Fungsi untuk mengirim email
export const sendEmail = async (emailData) => {
    try {
        console.log("Data email yang dikirim:", emailData); // Log data email
        const response = await axios.post(`${API_URL}/sendemail`, emailData);
        return response.data;
    } catch (error) {
        console.error("Error sending email:", error.response?.data || error); // Log error respons
        throw error;
    }
};
