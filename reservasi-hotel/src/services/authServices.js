import axios from "axios";

const API_URL = "http://localhost:5000/api";

// ==========================================
// FUNGSI LOGIN (Dengan Log Debugging Detail)
// ==========================================
export const login = async (email, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password, role });
    // Mengembalikan data response (biasanya berisi token dan userRole)
    return response.data;
  } catch (error) {
    // 🔍 LOG DEBUGGING UNTUK DI INSPECT CONSOLE BROWSER
    console.error("======= DEBUG ERROR LOGIN =======");
    console.error("Status Code Server:", error.response?.status);
    console.error("Response Data dari Backend:", error.response?.data);
    console.error("Pesan Error Asli:", error.response?.data?.message);
    console.error("=================================");

    // Mengambil pesan spesifik dari backend jika ada, jika tidak, memunculkan status code server
    const message = error.response?.data?.message || 
                    `Error Server (Status: ${error.response?.status || 'Koneksi Terputus'}). Cek terminal backend kamu!`;
                    
    throw new Error(message);
  }
};

// ==========================================
// FUNGSI REGISTRASI PELANGGAN (Dengan Log Detail)
// ==========================================
export const registerCustomer = async (nama, email, noHp, password) => {
  try {
    // Mengirim payload sesuai dengan destructured object di backend: req.body
    const response = await axios.post(`${API_URL}/register`, {
      nama,
      email,
      noHp,
      password,
    });

    // Mengembalikan data jika berhasil ({ success: true, message: '...' })
    return response.data;
  } catch (error) {
    // 🔍 LOG DEBUGGING UNTUK DI INSPECT CONSOLE BROWSER
    console.error("======= DEBUG ERROR REGISTER =======");
    console.error("Status Code Server:", error.response?.status);
    console.error("Response Data dari Backend:", error.response?.data);
    console.error("====================================");

    const message = error.response?.data?.message || "Gagal melakukan registrasi.";
    throw new Error(message);
  }
};