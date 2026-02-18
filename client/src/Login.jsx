import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login({ setRole }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('/login', { username, password });
      if (response.data.success) {
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('username', username);
        setRole(response.data.role);
        navigate('/');
      } else {
        setError(response.data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 position-relative d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, #1a237e, #0d47a1, #1976d2)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
      }}
    >
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="text-center mb-5">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <h1 className="text-white display-4 m-0 fw-bold">Chakri Pao</h1>
                <img
                  src="logo.png"
                  alt="Logo"
                  className="ms-3"
                  style={{
                    width: '60px',
                    height: '60px',
                    filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
                  }}
                />
              </div>
              <p className="text-white-50 h5">Your one stop Job Portal</p>
            </div>

            <div
              className="bg-white rounded-4 p-4 p-md-5 shadow-lg"
              style={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
              }}
            >
              <div className="d-flex align-items-center mb-4">
                <h2 className="m-0 text-primary fw-bold">
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </h2>
              </div>

              {error && (
                <div
                  className="alert alert-danger d-flex align-items-center mb-4"
                  role="alert"
                  style={{
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    border: '1px solid rgba(220, 53, 69, 0.2)',
                    borderRadius: '12px'
                  }}
                >
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>{error}</div>
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="form-label text-muted fw-medium">
                    <i className="bi bi-person me-2"></i>
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{
                      borderRadius: '12px',
                      border: '1px solid rgba(0,0,0,0.1)',
                      padding: '12px 16px',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-muted fw-medium">
                    <i className="bi bi-key me-2"></i>
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      borderRadius: '12px',
                      border: '1px solid rgba(0,0,0,0.1)',
                      padding: '12px 16px',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>

                <div className="d-grid gap-3">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isLoading}
                    style={{
                      borderRadius: '12px',
                      padding: '12px 24px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      background: 'linear-gradient(45deg, #1976d2, #0d47a1)',
                      border: 'none',
                      boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)'
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Login
                      </>
                    )}
                  </button>

                  <Link
                    to="/register"
                    className="btn btn-outline-secondary btn-lg"
                    style={{
                      borderRadius: '12px',
                      padding: '12px 24px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      border: '2px solid rgba(0,0,0,0.1)',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <i className="bi bi-person-plus me-2"></i>
                    Create New Account
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
