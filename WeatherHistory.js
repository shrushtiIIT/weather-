import React, { useEffect, useState } from 'react';
import {
  Container, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, CircularProgress, Alert
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const WeatherHistory = () => {
  const { token } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/weather/history`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch weather history');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [token]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Weather History
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : history.length === 0 ? (
        <Alert severity="info">No weather history found.</Alert>
      ) : (
        <Paper elevation={3} sx={{ p: 2 }}>
          <List>
            {history.map((entry, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar
                    src={`https://openweathermap.org/img/wn/${entry.weather.weather[0].icon}@2x.png`}
                    alt="icon"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${entry.city} — ${entry.weather.weather[0].main}, ${Math.round(entry.weather.main.temp)}°C`}
                  secondary={new Date(entry.date).toLocaleString()}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default WeatherHistory;
