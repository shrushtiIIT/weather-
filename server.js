const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/weather-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
mongoose.connection.once('open', () => console.log('✅ MongoDB connected'));

// Models
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

const weatherHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  city: String,
  weather: Object,
  date: { type: Date, default: Date.now }
});
const WeatherHistory = mongoose.model('WeatherHistory', weatherHistorySchema);

// Middleware: Auth check
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// Routes
// Auth
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: 'All fields required' });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
  res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
});

// Weather endpoints
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

app.post('/api/weather/current', authenticateToken, async (req, res) => {
  const { city } = req.body;
  if (!city) return res.status(400).json({ message: 'City is required' });

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`);
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(err.response?.status || 500).json({ message: 'Error fetching current weather' });
  }
});

app.post('/api/weather/forecast', authenticateToken, async (req, res) => {
  const { lat, lon } = req.body;
  if (!lat || !lon) return res.status(400).json({ message: 'Latitude and longitude required' });

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: 'Error fetching forecast' });
  }
});

app.post('/api/weather/air-quality', authenticateToken, async (req, res) => {
  const { lat, lon } = req.body;
  if (!lat || !lon) return res.status(400).json({ message: 'Latitude and longitude required' });

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: 'Error fetching air quality data' });
  }
});

app.post('/api/weather/history', authenticateToken, async (req, res) => {
  const { city, weather } = req.body;
  if (!city || !weather) return res.status(400).json({ message: 'City and weather data required' });

  try {
    const entry = new WeatherHistory({ userId: req.user.userId, city, weather });
    await entry.save();
    res.status(201).json({ message: 'Weather history saved' });
  } catch (err) {
    console.error('Save history error:', err);
    res.status(500).json({ message: 'Failed to save weather history' });
  }
});

app.get('/api/weather/history', authenticateToken, async (req, res) => {
  try {
    const history = await WeatherHistory.find({ userId: req.user.userId }).sort({ date: -1 }).limit(10);
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch weather history' });
  }
});

// Profile
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', time: new Date().toISOString(), mongo: mongoose.connection.readyState });
});

// Catch-all & error middleware
app.use('*', (req, res) => res.status(404).json({ message: 'Route not found' }));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
