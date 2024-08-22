import axios from "axios";

const URL = "http://localhost:5000/api";

// Users
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

export const getUserById = async (id) => {
  try {
    const result = await axios.get(URL + `/user/${id}`);
    return result.data;
  } catch (error) {
    return {
      error: error.response.data.error
    };
  }
}

export const getAllUsers = async () => {
  try {
    const result = await axios.get(URL + '/users');
    return result.data;
  } catch (error) {
    return {
      error: error.response.data.error
    };
  }
}

export const updateUsername = async (userId, username) => {
  try {
    const result = await axios.patch(URL + `/change-username`, {
      id: userId,
      username
    });
    return result.data;
  } catch (error) {
    return {
      error: error.response.data.error
    };
  }
}

export const updatePassword = async (userId, oldPassword, password) => {
  try {
    const result = await axios.patch(URL + `/change-pass`, {
      id: userId,
      oldPass: oldPassword,
      pass: password
    });
    return result.data;
  } catch (error) {
    return {
      error: error.response.data.error
    };
  }
}

export const deleteUser = async (userId) => {
  try {
    const result = await axios.delete(URL + `/user/${userId}`);
    return result.data;
  } catch (error) {
    return {
      error: error.response.data.error || 'Failed to delete user'
    };
  }
}

// Posts
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

export const createPost = async (postData) => {
  try {
    const result = await axios.post(URL + '/posts', postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return result.data;
  } catch (error) {
    console.log(error);
    return {
      error: error.response.data.error
    };
  }
}

// Likes
export const isPostLiked = async (postId, userId) => {
  try {
    const result = await axios.get(URL + `/likeStatus?postId=${postId}&userId=${userId}`);

    return result.data;
  } catch (error) {
    return {
      error: error.response.data.error
    };
  }
}

export const toggleLike = async (postId, userId) => {
  try {
    const result = await axios.post(URL + '/toggleLike', { postId, userId });
    return result.data;
  } catch (error) {
    return {
      error: error.response.data.error
    };
  }
};

// Comments
export const getPostComments = async (postId) => {
  try {
    const result = await axios.get(URL + `/comments/${postId}`);
    return result.data;
  } catch (error) {
    return {
      error: error.response.data.error
    }
  }
}

export const addComment = async (postId, userId, text) => {
  try {
    const result = await axios.post(URL + '/comments', {
      postId,
      userId,
      text
    })
    return result.data;
  } catch (error) {
    return {
      error: error.response.data.error
    }
  }
}