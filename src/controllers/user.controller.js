const userService = require('../services/user.service');

exports.register = async (req, res, next) => {
	try {
		const user = await userService.registerUser(req.body);
		res.status(201).json({ id: user._id, email: user.email });
	} catch (err) {
		next(err);
	}
};

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const { user, token } = await userService.authenticateUser(email, password);
		res.json({ token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, grade: user.grade } });
	} catch (err) {
		next(err);
	}
};
