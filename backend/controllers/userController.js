const db = require('../models');

const getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

const registerUser = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await db.User.findOne({ where: { username } });

    if (user) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const newUser = await db.User.create(req.body);
    res.status(200).json({ userId: newUser.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isPasswordValid = password == user.password;

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ userId: user.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log in' });
  }
}

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await db.User.findOne({ where: { id } });

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

const updateUsername = async (req, res) => {
  const { id, username } = req.body;

  try {
    const user = await db.User.findOne({ where: { id } });

    if (user) {
      user.username = username;
      await user.save();

      res.status(200).json({ message: 'Username updated successfully', user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Something went wrong:', error);
    res.status(500).json({ error: 'Failed to update username' });
  }
};

const updatePassword = async (req, res) => {
  const { id, oldPass, pass } = req.body;

  try {
    const user = await db.User.findOne({ where: { id } });

    if (user) {
      if (user.password === oldPass) {
        user.password = pass;
        await user.save();
  
        res.status(200).json({ message: 'Password changed successfully', user });
      } else {
        res.status(405).json({ error: 'Incorrect password!' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Something went wrong:', error);
    res.status(500).json({ error: 'Failed to update username' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await db.User.findOne({ where: { id } });

    if (user) {
      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Something went wrong:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  getUserById,
  updateUsername,
  updatePassword,
  deleteUser
};