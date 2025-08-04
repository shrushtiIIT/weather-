import React from 'react';
import { Container, Paper, Typography, Box, Card, CardContent, Grid, Chip, CircularProgress, Alert, Avatar, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  // The user object is now directly available from the context, which is the correct approach.
  const { user, loading } = useAuth();

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Correctly handles the loading state while the user profile is being fetched by the context.
  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  // Correctly handles the case where the user is not found or the token is invalid.
  if (!user) {
      return (
          <Container maxWidth="lg">
              <Alert severity="error" sx={{mt: 4}}>Could not load user profile. Please try logging in again.</Alert>
          </Container>
      )
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            User Profile
          </Typography>
          
          <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Card elevation={2}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar sx={{ width: 120, height: 120, mx: 'auto', mb: 2, bgcolor: 'primary.main', fontSize: '3rem' }}>
                      <AccountCircleIcon sx={{ fontSize: 80 }} />
                    </Avatar>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {user.username}
                    </Typography>
                    <Chip label="Active User" color="success" variant="outlined" sx={{ mb: 2 }} />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={8}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Account Information</Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <PersonIcon sx={{ mr: 2, color: 'primary.main' }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Username</Typography>
                            <Typography variant="body1">{user.username}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Email Address</Typography>
                            <Typography variant="body1">{user.email}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <CalendarTodayIcon sx={{ mr: 2, color: 'primary.main' }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Member Since</Typography>
                            <Typography variant="body1">{formatDate(user.createdAt)}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <PersonIcon sx={{ mr: 2, color: 'primary.main' }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary">User ID</Typography>
                            <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>{user._id}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
