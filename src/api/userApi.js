import axios from "axios";

export const register = async (data) => {
  try {
    const response = await axios.post(`https://api.antrian.programmergenz.site/api/salon/users/register`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const login = async (data) => {
  try {
    const response = await axios.post("https://api.antrian.programmergenz.site/api/salon/users/login", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`https://api.antrian.programmergenz.site/api/salon/users/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const getUsers = async () => {
  try {
    const response = await axios.get('https://api.antrian.programmergenz.site/api/salon/users');
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}