import axios from "axios";

export const createQueue = async (data) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/salon/queue/create", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const getQueues = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/salon/queue");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const getQueueByUser = async (telepon) => {
  try {
    // Gunakan 'params' untuk memasukkan data sebagai query parameter
    const response = await axios.get(`http://127.0.0.1:8000/api/salon/queue/user/${telepon}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const updateQueueStatus = async (id) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/salon/queue/update/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}