// api.js
import axios from 'axios';

const apiUrl = 'http://localhost:6000';

const saveZipCodeApi = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/api/save-zip-code`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default saveZipCodeApi;
