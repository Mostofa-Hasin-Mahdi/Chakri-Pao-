import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfileMenu from './ProfileMenu';

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!role || role !== 'jobseeker') {
      navigate('/');
      return;
    }
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:3001/my-applications', {
        headers: {
          'x-user-role': role,
          'x-user-username': username
        }
      });
      setApplications(response.data);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to fetch applications');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 position-relative"
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

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <h2 className="m-0 text-white fw-bold">My Applications</h2>
          </div>
          <ProfileMenu />
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

        {isLoading ? (
          <div className="text-center">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {applications.length === 0 ? (
              <div 
                className="text-center p-5"
                style={{
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                }}
              >
                <i className="bi bi-file-earmark-text text-primary" style={{ fontSize: '3rem' }}></i>
                <h3 className="mt-3 text-primary">No Applications Yet</h3>
                <p className="text-muted">You haven't applied for any jobs yet</p>
                <button 
                  className="btn btn-primary mt-3"
                  onClick={() => navigate('/')}
                  style={{
                    borderRadius: '12px',
                    padding: '10px 20px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    background: 'linear-gradient(45deg, #1976d2, #0d47a1)',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)'
                  }}
                >
                  <i className="bi bi-search me-2"></i>
                  Browse Jobs
                </button>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {applications.filter(app => app.jobId).map((application) => (
                  <div key={application._id} className="col">
                    <div 
                      className="card h-100 border-0 shadow-lg rounded-4"
                      style={{
                        backdropFilter: 'blur(10px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div className="d-flex align-items-center">
                            <img 
                              src={`https://api.dicebear.com/7.x/initials/svg?seed=${application.jobId?.companyname || 'Company'}&backgroundColor=1976d2&textColor=ffffff`}
                              alt={application.jobId?.companyname || 'Company'}
                              className="rounded-circle me-3"
                              style={{ 
                                width: '50px', 
                                height: '50px',
                                objectFit: 'cover',
                                border: '2px solid rgba(255, 255, 255, 0.2)',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                              }}
                            />
                            <h5 className="card-title text-primary fw-bold mb-0">
                              {application.jobId?.companyname || 'Unknown Company'}
                            </h5>
                          </div>
                          <span 
                            className={`badge rounded-pill px-3 py-2 ${
                              application.status === 'accepted' ? 'bg-success' :
                              application.status === 'rejected' ? 'bg-danger' :
                              'bg-warning'
                            }`}
                          >
                            <i className={`bi ${
                              application.status === 'accepted' ? 'bi-check-circle' :
                              application.status === 'rejected' ? 'bi-x-circle' :
                              'bi-clock'
                            } me-1`}></i>
                            {application.status ? application.status.charAt(0).toUpperCase() + application.status.slice(1) : 'Pending'}
                          </span>
                        </div>

                        <h6 className="card-subtitle mb-3 text-muted">
                          <i className="bi bi-briefcase me-2"></i>
                          {application.jobId?.jobrole || 'Unknown Role'}
                        </h6>

                        <div className="d-flex align-items-center mb-3">
                          <span 
                            className="badge rounded-pill px-3 py-2"
                            style={{
                              backgroundColor: 'rgba(46, 125, 50, 0.1)',
                              color: '#2e7d32',
                              fontSize: '0.9rem'
                            }}
                          >
                            <i className="bi bi-currency-dollar me-1"></i>
                            Tk. {application.jobId?.salary || 'N/A'}
                          </span>
                        </div>

                        <p className="card-text text-muted">
                          <i className="bi bi-geo-alt me-2"></i>
                          {application.jobId?.location || 'Unknown Location'}
                        </p>

                        <p className="card-text text-muted">
                          <i className="bi bi-clock me-2"></i>
                          Applied on {new Date(application.createdAt).toLocaleDateString()}
                        </p>

                        {application.status === 'accepted' && (
                          <div className="alert alert-success mt-3 mb-0" role="alert">
                            <i className="bi bi-info-circle me-2"></i>
                            Congratulations! You've been called for an interview. The employer will contact you soon.
                          </div>
                        )}

                        {application.status === 'rejected' && (
                          <div className="alert alert-danger mt-3 mb-0" role="alert">
                            <i className="bi bi-info-circle me-2"></i>
                            Unfortunately, your application was not selected for this position.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MyApplications; 