import axios from "axios";

const URL = "http://localhost:5000/api";

export const loginUser = async (username, password) => {
  try {
    const result = await axios.post(URL + '/login', {
      username,
      password
    });

    return result.data;
  } catch (error) {
    return error.message;
  }
};

export const registerUser = async (username, password) => {
  try {
    const result = await axios.post(URL + '/register', {
      username,
      password
    });

    return result.data;
  } catch (error) {
    return {
      error: error.response.data.error
    };
  }
};

export const getAllPosts = async () => {
  try {
    const result = await axios.get(URL + '/posts');

    return result.data;
  } catch (error) {
    return {
      error: error.response.data.error
    };
  }
}

export const getPostsByDate = async () => {
  try {
    const result = await axios.get(URL + '/new-posts');

    return result.data;
  } catch (error) {
    return {
      error: error.response.data.error
    };
  }
}