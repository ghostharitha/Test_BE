
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(payload) {
	const { firstName, lastName, phone, email, grade, password } = payload;
	const existing = await User.findOne({ email });
	if (existing) throw new Error('Email already registered');
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	const user = new User({ firstName, lastName, phone, email, grade, password: hash });
	await user.save();
	return user;
}

async function authenticateUser(email, password) {
	const user = await User.findOne({ email });
	if (!user) throw new Error('Invalid credentials');
	const ok = await bcrypt.compare(password, user.password);
	if (!ok) throw new Error('Invalid credentials');
	const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'changeme', { expiresIn: '7d' });
	return { user, token };
}

module.exports = { registerUser, authenticateUser };
