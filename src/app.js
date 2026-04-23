const express = require('express');
const path = require('path');
const userRoutes = require('./routes/user.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', allowedOrigin);
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
