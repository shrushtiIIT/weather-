import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
  Fade,
  Chip,
  Avatar,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import CloudIcon from '@mui/icons-material/Cloud';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import WindPowerIcon from '@mui/icons-material/WindPower';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock current weather data for enhanced dashboard
  const [currentWeather, setCurrentWeather] = useState({
    location: 'San Francisco',
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    feelsLike: 24
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      title: 'Weather Search',
      description: 'Get real-time weather data, forecasts, and detailed atmospheric conditions for any city worldwide with advanced radar and satellite imagery',
      icon: <SearchIcon sx={{ fontSize: { xs: 35, md: 45 } }} />,
      action: () => navigate('/search'),
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      stats: 'Real-time data',
      color: '#667eea',
      bgPattern: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)'
    },
    {
      title: 'Weather History',
      description: 'Access your complete search history with detailed weather patterns, trends analysis, and climate data visualization tools',
      icon: <HistoryIcon sx={{ fontSize: { xs: 35, md: 45 } }} />,
      action: () => navigate('/history'),
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      stats: 'Last 10 searches',
      color: '#f093fb',
      bgPattern: 'radial-gradient(circle at 80% 20%, rgba(245, 87, 108, 0.3) 0%, transparent 50%)'
    },
    {
      title: 'User Profile',
      description: 'Manage account preferences, customize weather alerts, view usage statistics, and personalize your dashboard experience',
      icon: <PersonIcon sx={{ fontSize: { xs: 35, md: 45 } }} />,
      action: () => navigate('/profile'),
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      stats: 'Account settings',
      color: '#4facfe',
      bgPattern: 'radial-gradient(circle at 50% 50%, rgba(79, 172, 254, 0.3) 0%, transparent 50%)'
    }
  ];

  const quickStats = [
    { 
      icon: <ThermostatIcon />, 
      label: 'Temperature', 
      value: `${currentWeather.temperature}°C`, 
      color: '#ff6b6b',
      trend: '+2°',
      subtitle: 'vs yesterday'
    },
    { 
      icon: <OpacityIcon />, 
      label: 'Humidity', 
      value: `${currentWeather.humidity}%`, 
      color: '#74b9ff',
      trend: '-5%',
      subtitle: 'this hour'
    },
    { 
      icon: <WindPowerIcon />, 
      label: 'Wind Speed', 
      value: `${currentWeather.windSpeed} km/h`, 
      color: '#00cec9',
      trend: '+3 km/h',
      subtitle: 'gusts up to 18'
    },
    { 
      icon: <VisibilityIcon />, 
      label: 'Visibility', 
      value: `${currentWeather.visibility} km`, 
      color: '#a29bfe',
      trend: 'Clear',
      subtitle: 'excellent'
    }
  ];

  const recentActivity = [
    { city: 'New York', time: '2 mins ago', temp: '18°C', condition: 'Sunny' },
    { city: 'London', time: '1 hour ago', temp: '12°C', condition: 'Cloudy' },
    { city: 'Tokyo', time: '3 hours ago', temp: '25°C', condition: 'Rain' }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: `
        radial-gradient(circle at 10% 20%, rgba(90, 92, 106, 0.1) 0%, transparent 50.2%),
        radial-gradient(circle at 80% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50.2%),
        radial-gradient(circle at 40% 40%, rgba(79, 172, 254, 0.1) 0%, transparent 50.2%),
        linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)
      `,
      pb: 4,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <Box sx={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        filter: 'blur(40px)',
        animation: 'float 6s ease-in-out infinite',
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      }} />
      
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ pt: { xs: 2, md: 4 }, pb: 2 }}>
          {/* Enhanced Hero Section */}
          <Fade in timeout={800}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 3, md: 6 }, 
                mb: 4, 
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                borderRadius: 4,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Time and Weather Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                  <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                    {currentTime.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    {currentTime.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <LocationOnIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <Typography variant="body1" color="text.secondary">
                      {currentWeather.location}
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {currentWeather.temperature}°C
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Feels like {currentWeather.feelsLike}°C
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <WbSunnyIcon 
                  sx={{ 
                    fontSize: { xs: 60, md: 80 }, 
                    color: '#ffd93d',
                    filter: 'drop-shadow(0 4px 8px rgba(255, 217, 61, 0.3))',
                    mb: 2 
                  }} 
                />
              </Box>
              
              <Typography 
                variant={isMobile ? "h3" : "h2"} 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2
                }}
              >
                Weather Dashboard
              </Typography>
              
              <Typography 
                variant="h5" 
                color="text.secondary" 
                gutterBottom
                sx={{ fontWeight: 500, mb: 2 }}
              >
                Welcome back, {user?.username}! 🌟
              </Typography>
              
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6, textAlign: 'center' }}
              >
                Your comprehensive weather companion providing accurate forecasts, 
                historical data, and real-time atmospheric conditions from around the globe.
              </Typography>
            </Paper>
          </Fade>

          {/* Quick Stats Enhanced */}
          <Fade in timeout={1000}>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {quickStats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Card 
                    sx={{ 
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: 3,
                      p: 2,
                      height: '100%',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                      }
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', p: '16px !important' }}>
                      <Box 
                        sx={{ 
                          display: 'inline-flex',
                          p: 1.5,
                          borderRadius: '50%',
                          bgcolor: `${stat.color}20`,
                          color: stat.color,
                          mb: 2
                        }}
                      >
                        {React.cloneElement(stat.icon, { sx: { fontSize: 24 } })}
                      </Box>
                      
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {stat.value}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {stat.label}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                        <TrendingUpIcon sx={{ fontSize: 14, color: 'success.main' }} />
                        <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>
                          {stat.trend}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {stat.subtitle}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Fade>

          {/* Main Feature Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Fade in timeout={1200 + index * 200}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: 4,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.02)',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                        '& .feature-icon': {
                          transform: 'scale(1.1) rotate(5deg)',
                        },
                        '& .gradient-bg': {
                          opacity: 1,
                          height: 8
                        }
                      }
                    }}
                  >
                    {/* Enhanced Gradient Background */}
                    <Box
                      className="gradient-bg"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 6,
                        background: feature.gradient,
                        opacity: 0.8,
                        transition: 'all 0.3s ease'
                      }}
                    />

                    {/* Background Pattern */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '50%',
                        height: '50%',
                        background: feature.bgPattern,
                        opacity: 0.6,
                        borderRadius: '0 0 0 100%'
                      }}
                    />

                    <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 4, position: 'relative', zIndex: 1 }}>
                      <Box 
                        className="feature-icon"
                        sx={{ 
                          display: 'inline-flex',
                          p: 2.5,
                          borderRadius: '50%',
                          background: feature.gradient,
                          color: 'white',
                          mb: 3,
                          transition: 'transform 0.3s ease',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                        }}
                      >
                        {feature.icon}
                      </Box>
                      
                      <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="h2"
                        sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}
                      >
                        {feature.title}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ lineHeight: 1.6, mb: 3 }}
                      >
                        {feature.description}
                      </Typography>

                      <Chip
                        label={feature.stats}
                        size="small"
                        sx={{
                          background: feature.gradient,
                          color: 'white',
                          fontWeight: 600,
                          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                        }}
                      />
                    </CardContent>
                    
                    <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                      <Button 
                        size="large" 
                        onClick={feature.action}
                        variant="contained"
                        sx={{ 
                          background: feature.gradient,
                          borderRadius: 25,
                          px: 4,
                          py: 1.5,
                          fontWeight: 600,
                          textTransform: 'none',
                          fontSize: '1rem',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                          '&:hover': {
                            boxShadow: '0 12px 35px rgba(0,0,0,0.2)',
                            transform: 'translateY(-2px)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Explore Now
                      </Button>
                    </CardActions>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>

          {/* Recent Activity Section */}
          <Fade in timeout={1800}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 4,
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 3,
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      color: 'text.primary',
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <AccessTimeIcon sx={{ color: 'primary.main' }} />
                    Recent Weather Searches
                  </Typography>
                  
                  {recentActivity.map((activity, index) => (
                    <Box key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar 
                            sx={{ 
                              bgcolor: 'primary.main',
                              width: 40,
                              height: 40,
                              fontSize: '0.9rem'
                            }}
                          >
                            {activity.city.substring(0, 2)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {activity.city}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {activity.time} • {activity.condition}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {activity.temp}
                        </Typography>
                      </Box>
                      {index < recentActivity.length - 1 && <Divider />}
                    </Box>
                  ))}
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 4,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    borderRadius: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <CloudIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Weather Insights
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                    Get personalized weather insights, alerts, and recommendations based on your location and preferences.
                  </Typography>
                  <Button 
                    variant="outlined" 
                    sx={{ 
                      mt: 3,
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        borderColor: 'white'
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;