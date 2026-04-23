const express = require('express');
const path = require('path');
const userRoutes = require('./routes/user.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

const allowedOrigins = (process.env.FRONTEND_URL || 'https://testfe-sigma.vercel.app,http://localhost:5173')
	.split(',')
	.map((origin) => origin.trim())
	.filter(Boolean);

app.use((req, res, next) => {
	const requestOrigin = req.headers.origin;
	if (!requestOrigin || allowedOrigins.includes(requestOrigin)) {
		res.header('Access-Control-Allow-Origin', requestOrigin || allowedOrigins[0]);
	}
	res.header('Vary', 'Origin');
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTIONS') return res.sendStatus(204);
	next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => {
	res.json({ status: 'ok' });
});

app.use('/api/auth', userRoutes);

app.use(errorMiddleware);

module.exports = app;
