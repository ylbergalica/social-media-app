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
  try {
    const newUser = await db.User.create(req.body);
    res.status(200).json(newUser);
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

module.exports = {
  getAllUsers,
  registerUser,
  loginUser
};