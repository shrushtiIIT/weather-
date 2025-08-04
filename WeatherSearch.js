import React, { useState } from 'react';
import {
  Container, Paper, TextField, Button, Typography, Box, Alert, Grid, CircularProgress,
  List, ListItem, ListItemText, ListItemIcon, Card, CardContent
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import GrainIcon from '@mui/icons-material/Grain';

const getWeatherIcon = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
const formatTime = (timestamp) =>
  new Date(timestamp * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
const getWindDirection = (deg) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return directions[Math.round(deg / 22.5) % 16];
};

const WeatherSearch = () => {
  const { token } = useAuth();
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const apiBase = process.env.REACT_APP_API_URL;

      const currentRes = await axios.post(`${apiBase}/weather/current`, { city: city.trim() }, { headers });
      const current = currentRes.data;

      if (!current.coord || current.coord.lat == null || current.coord.lon == null) {
        throw new Error('Invalid coordinates received from weather API.');
      }

      const { lat, lon } = current.coord;

      await axios.post(`${apiBase}/weather/history`, {
        city: city.trim(),
        weather: current
      }, { headers });

      const [forecastRes, airRes] = await Promise.all([
        axios.post(`${apiBase}/weather/forecast`, { lat, lon }, { headers }),
        axios.post(`${apiBase}/weather/air-quality`, { lat, lon }, { headers }),
      ]);

      setWeatherData({
        current,
        forecast: forecastRes.data,
        airQuality: airRes.data.list?.[0] || null,
      });

    } catch (err) {
      console.error('Search error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
        <Typography variant="h4" gutterBottom align="center">Weather Dashboard</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button variant="contained" onClick={handleSearch} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Search'}
          </Button>
        </Box>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress size={60} />
        </Box>
      )}

      {weatherData && (
        <Grid container spacing={3}>
          <Grid item xs={12}><CurrentWeather data={weatherData.current} /></Grid>
          <Grid item xs={12}><HourlyForecast data={weatherData.forecast.list} /></Grid>
          <Grid item xs={12} md={7} lg={8}><DailyForecast data={weatherData.forecast.list} /></Grid>
          <Grid item xs={12} md={5} lg={4}><WeatherDetails data={weatherData.current} airQuality={weatherData.airQuality} /></Grid>
        </Grid>
      )}
    </Container>
  );
};

// --- Subcomponents ---
const CurrentWeather = ({ data }) => (
  <Card elevation={2}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h4">{data.name}</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
            {data.weather[0].description}
          </Typography>
        </Box>
        <img src={getWeatherIcon(data.weather[0].icon)} alt="icon" width={80} height={80} />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{Math.round(data.main.temp)}°C</Typography>
        <Typography variant="h6" color="text.secondary" sx={{ ml: 2 }}>
          Feels like {Math.round(data.main.feels_like)}°
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const HourlyForecast = ({ data }) => (
  <Paper elevation={2} sx={{ p: 2 }}>
    <Typography variant="h6" gutterBottom>Hourly Forecast</Typography>
    <Box sx={{ display: 'flex', overflowX: 'auto', pb: 1 }}>
      {data.slice(0, 8).map(hour => (
        <Box key={hour.dt} sx={{ textAlign: 'center', minWidth: 80, p: 1 }}>
          <Typography variant="body2">{formatTime(hour.dt)}</Typography>
          <img src={getWeatherIcon(hour.weather[0].icon)} alt="icon" width={50} height={50} />
          <Typography variant="h6">{Math.round(hour.main.temp)}°</Typography>
        </Box>
      ))}
    </Box>
  </Paper>
);

const DailyForecast = ({ data }) => {
  const daily = data.filter(item => item.dt_txt.includes("12:00:00"));
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>5-Day Forecast</Typography>
      <List dense>
        {daily.map(day => (
          <ListItem key={day.dt}>
            <ListItemIcon sx={{ minWidth: 50 }}>
              <img src={getWeatherIcon(day.weather[0].icon)} alt="icon" width={40} height={40} />
            </ListItemIcon>
            <ListItemText
              primary={new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}
              secondary={day.weather[0].main}
            />
            <Typography variant="body1">
              <strong>{Math.round(day.main.temp_max)}°</strong> / {Math.round(day.main.temp_min)}°
            </Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

const WeatherDetails = ({ data, airQuality }) => {
  const getAqiLabel = (aqi) => ['N/A', 'Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'][aqi] || 'N/A';

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}><DetailCard icon={<Brightness5Icon />} title="Sunrise" value={formatTime(data.sys.sunrise)} /></Grid>
      <Grid item xs={6}><DetailCard icon={<Brightness4Icon />} title="Sunset" value={formatTime(data.sys.sunset)} /></Grid>
      <Grid item xs={6}><DetailCard icon={<AirIcon />} title="Wind" value={`${getWindDirection(data.wind.deg)} ${data.wind.speed.toFixed(1)} m/s`} /></Grid>
      <Grid item xs={6}><DetailCard icon={<OpacityIcon />} title="Humidity" value={`${data.main.humidity}%`} /></Grid>
      <Grid item xs={6}><DetailCard icon={<VisibilityIcon />} title="Visibility" value={`${(data.visibility / 1000).toFixed(1)} km`} /></Grid>
      <Grid item xs={6}><DetailCard icon={<ArrowDownwardIcon />} title="Pressure" value={`${data.main.pressure} hPa`} /></Grid>
      {airQuality && (
        <Grid item xs={12}>
          <DetailCard icon={<GrainIcon />} title="Air Quality" value={getAqiLabel(airQuality.main.aqi)} />
        </Grid>
      )}
    </Grid>
  );
};

const DetailCard = ({ icon, title, value }) => (
  <Paper elevation={1} sx={{ p: 2, textAlign: 'center', height: '100%' }}>
    <Box sx={{ color: 'text.secondary', mb: 1 }}>{icon}</Box>
    <Typography variant="body2" color="text.secondary">{title}</Typography>
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{value}</Typography>
  </Paper>
);

export default WeatherSearch;
