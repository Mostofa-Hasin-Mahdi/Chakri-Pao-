import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfileMenu from './ProfileMenu';

function JobApplications() {
  const [applications, setApplications] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { jobId } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!role || role !== 'employer') {
      navigate('/');
      return;
    }
    fetchApplications();
    fetchJobDetails();
  }, [jobId]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`/applications/${jobId}`, {
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

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`/getuser/${jobId}`);
      setJobDetails(response.data);
    } catch (err) {
      console.error('Error fetching job details:', err);
      setError('Failed to fetch job details');
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await axios.put(`/applications/${applicationId}/status`,
        { status: newStatus },
        {
          headers: {
            'x-user-role': role,
            'x-user-username': username
          }
        }
      );
      fetchApplications();
    } catch (err) {
      console.error('Error updating application status:', err);
      setError('Failed to update application status');
    }
  };

  const handleDownloadResume = (filename) => {
    if (filename) {
      const link = document.createElement('a');
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      link.href = `${baseUrl}/uploads/${filename}`;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getFileIcon = (filename) => {
    if (filename) {
      const extension = filename.split('.').pop().toLowerCase();
      switch (extension) {
        case 'pdf':
          return 'bi-file-earmark-pdf';
        case 'doc':
        case 'docx':
          return 'bi-file-earmark-word';
        default:
          return 'bi-file-earmark';
      }
    }
    return 'bi-file-earmark';
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
            <h2 className="m-0 text-white fw-bold">Job Applications</h2>
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
            {jobDetails && (
              <div
                className="mb-4 p-4"
                style={{
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                }}
              >
                <h3 className="text-primary fw-bold mb-3 text-break">{jobDetails.companyname}</h3>
                <div className="d-flex gap-3 flex-wrap">
                  <span className="badge bg-primary rounded-pill text-wrap">
                    <i className="bi bi-briefcase me-1"></i>
                    {jobDetails.jobrole}
                  </span>
                  <span className="badge bg-success rounded-pill text-wrap">
                    <i className="bi bi-currency-dollar me-1"></i>
                    {jobDetails.salary}
                  </span>
                  <span className="badge bg-info rounded-pill text-wrap">
                    <i className="bi bi-geo-alt me-1"></i>
                    {jobDetails.location}
                  </span>
                </div>
              </div>
            )}

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
                <p className="text-muted">No one has applied for this job yet</p>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {applications.map((application) => (
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
                        <div className="d-flex align-items-center mb-3">
                          <div
                            className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-3"
                            style={{ width: '50px', height: '50px' }}
                          >
                            <i className="bi bi-person-fill text-white" style={{ fontSize: '1.5rem' }}></i>
                          </div>
                          <div>
                            <h5 className="card-title text-primary fw-bold mb-0">{application.jobseeker}</h5>
                            <p className="text-muted m-0">
                              <i className="bi bi-clock me-1"></i>
                              Applied {new Date(application.createdAt || parseInt(application._id.substring(0, 8), 16) * 1000).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <span
                            className={`badge rounded-pill px-3 py-2 ${application.status === 'accepted' ? 'bg-success' :
                              application.status === 'rejected' ? 'bg-danger' :
                                'bg-warning'
                              }`}
                          >
                            <i className={`bi ${application.status === 'accepted' ? 'bi-check-circle' :
                              application.status === 'rejected' ? 'bi-x-circle' :
                                'bi-clock'
                              } me-1`}></i>
                            {application.status ? application.status.charAt(0).toUpperCase() + application.status.slice(1) : 'Pending'}
                          </span>
                        </div>

                        {/* Resume Section */}
                        {application.resume && (
                          <div className="mb-3">
                            <div
                              className="p-3 rounded-3"
                              style={{
                                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                                border: '1px solid rgba(25, 118, 210, 0.2)'
                              }}
                            >
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                  <i className={`bi ${getFileIcon(application.resume)} text-primary me-2`} style={{ fontSize: '1.2rem' }}></i>
                                  <span className="text-muted small">{application.resume}</span>
                                </div>
                                <button
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={() => handleDownloadResume(application.resume)}
                                  style={{
                                    borderRadius: '6px',
                                    padding: '4px 8px',
                                    fontSize: '0.8rem'
                                  }}
                                >
                                  <i className="bi bi-download me-1"></i>
                                  Download
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {(!application.status || application.status === 'pending') && (
                          <div className="d-flex gap-2 mt-3">
                            <button
                              className="btn btn-success btn-sm flex-grow-1"
                              onClick={() => handleStatusUpdate(application._id, 'accepted')}
                              style={{
                                borderRadius: '8px',
                                padding: '8px 16px',
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <i className="bi bi-check-circle me-1"></i>
                              Call for Interview
                            </button>
                            <button
                              className="btn btn-danger btn-sm flex-grow-1"
                              onClick={() => handleStatusUpdate(application._id, 'rejected')}
                              style={{
                                borderRadius: '8px',
                                padding: '8px 16px',
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <i className="bi bi-x-circle me-1"></i>
                              Reject
                            </button>
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

export default JobApplications; 