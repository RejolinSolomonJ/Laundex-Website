import axios from 'axios';

const API_URL = 'https://laundex-server.onrender.com';

const seedServices = async () => {
    try {
        console.log(`Attempting to seed services at ${API_URL}...`);
        const res = await axios.post(`${API_URL}/api/services/seed`);
        console.log('Success:', res.data);
    } catch (err) {
        if (err.response) {
            console.error('Error Response:', err.response.status, err.response.data);
        } else {
            console.error('Error:', err.message);
        }
    }
};

seedServices();
