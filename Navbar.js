import React, { useState } from 'react';
import { 
  Sun, 
  LogOut, 
  User, 
  History, 
  Search, 
  Menu, 
  X,
  Home
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: History, label: 'History', path: '/history' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const isActivePath = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        color: '#2d3748',
        padding: '12px 0',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
        }}>
          {/* Logo */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 12, 
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }} 
            onClick={() => handleNavigation('/')}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              padding: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sun size={24} color="white" />
            </div>
            <span style={{ 
              fontWeight: 800, 
              fontSize: 24, 
              letterSpacing: 1,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              WeatherApp
            </span>
          </div>

          {/* Desktop Navigation */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8,
            '@media (max-width: 768px)': {
              display: 'none'
            }
          }}>
            {user && (
              <>
                {navigationItems.map((item) => (
                  <button 
                    key={item.path}
                    onClick={() => handleNavigation(item.path)} 
                    style={{
                      ...navBtn,
                      background: isActivePath(item.path) 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'rgba(102, 126, 234, 0.1)',
                      color: isActivePath(item.path) ? 'white' : '#667eea',
                      transform: isActivePath(item.path) ? 'translateY(-2px)' : 'none',
                      boxShadow: isActivePath(item.path) ? '0 8px 25px rgba(102, 126, 234, 0.3)' : 'none'
                    }}
                  >
                    <item.icon size={18}/> 
                    <span style={{ display: window.innerWidth > 1024 ? 'inline' : 'none' }}>
                      {item.label}
                    </span>
                  </button>
                ))}
                
                <div style={{
                  height: 40,
                  width: 1,
                  background: 'rgba(102, 126, 234, 0.2)',
                  margin: '0 12px'
                }} />

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '8px 16px',
                  background: 'rgba(102, 126, 234, 0.1)',
                  borderRadius: 25,
                  border: '1px solid rgba(102, 126, 234, 0.2)'
                }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: 14
                  }}>
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ 
                    fontWeight: 600, 
                    color: '#4a5568',
                    display: window.innerWidth > 1024 ? 'inline' : 'none'
                  }}>
                    {user.username}
                  </span>
                </div>

                <button 
                  onClick={handleLogout} 
                  style={{
                    ...navBtn, 
                    background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)', 
                    color: 'white',
                    marginLeft: 8
                  }}
                >
                  <LogOut size={18}/> 
                  <span style={{ display: window.innerWidth > 1024 ? 'inline' : 'none' }}>
                    Logout
                  </span>
                </button>
              </>
            )}
            
            {!user && (
              <>
                <button 
                  onClick={() => handleNavigation('/login')} 
                  style={{...navBtn, color: '#667eea'}}
                >
                  Login
                </button>
                <button 
                  onClick={() => handleNavigation('/register')} 
                  style={{
                    ...navBtn, 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                    color: 'white'
                  }}
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: window.innerWidth <= 768 ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(102, 126, 234, 0.1)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              borderRadius: 8,
              padding: 8,
              color: '#667eea',
              cursor: 'pointer'
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          zIndex: 999,
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            width: '80%',
            maxWidth: 320,
            height: '100vh',
            padding: 24,
            borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
            animation: 'slideInRight 0.3s ease-out'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 32,
              paddingBottom: 16,
              borderBottom: '1px solid rgba(102, 126, 234, 0.2)'
            }}>
              <span style={{
                fontWeight: 700,
                fontSize: 20,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Menu
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#667eea'
                }}
              >
                <X size={24} />
              </button>
            </div>

            {user && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: 16,
                background: 'rgba(102, 126, 234, 0.1)',
                borderRadius: 12,
                marginBottom: 24
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: 16
                }}>
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#2d3748' }}>
                    {user.username}
                  </div>
                  <div style={{ fontSize: 14, color: '#718096' }}>
                    {user.email}
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {user && navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  style={{
                    ...mobileNavBtn,
                    background: isActivePath(item.path) 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'transparent',
                    color: isActivePath(item.path) ? 'white' : '#4a5568'
                  }}
                >
                  <item.icon size={20}/> {item.label}
                </button>
              ))}

              {user && (
                <button onClick={handleLogout} style={{
                  ...mobileNavBtn,
                  background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
                  color: 'white',
                  marginTop: 16
                }}>
                  <LogOut size={20}/> Logout
                </button>
              )}

              {!user && (
                <>
                  <button 
                    onClick={() => handleNavigation('/login')} 
                    style={mobileNavBtn}
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => handleNavigation('/register')} 
                    style={{
                      ...mobileNavBtn,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white'
                    }}
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }
        `}
      </style>
    </>
  );
};

const navBtn = {
  background: 'rgba(102, 126, 234, 0.1)',
  color: '#667eea',
  border: '1px solid rgba(102, 126, 234, 0.2)',
  borderRadius: 12,
  padding: '10px 16px',
  fontWeight: 600,
  fontSize: 14,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  whiteSpace: 'nowrap',
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.2)'
  }
};

const mobileNavBtn = {
  background: 'transparent',
  color: '#4a5568',
  border: 'none',
  borderRadius: 12,
  padding: '16px 20px',
  fontWeight: 600,
  fontSize: 16,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  transition: 'all 0.2s ease',
  width: '100%',
  textAlign: 'left'
};

export default Navbar;