import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import aidRoutes from './routes/aidRequests';
import { initSockets } from './sockets';

dotenv.config();
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/aid', aidRoutes);

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Start
(async () => {
  await connectDB();
  const io = initSockets(server);
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
