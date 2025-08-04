import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import ProfileMenu from './ProfileMenu';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [applications, setApplications] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetchUsers();
    if (role === 'jobseeker') {
      fetchApplications();
    }
  }, [searchTerm]);

  const fetchUsers = () => {
    axios.get(`http://localhost:3001?search=${searchTerm}`)
      .then(result => setUsers(result.data))
      .catch(err => {
        console.error('Error fetching jobs:', err);
        setError('Failed to fetch jobs');
      });
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:3001/my-applications', {
        headers: {
          'x-user-username': username,
          'x-user-role': role
        }
      });
      const applicationMap = {};
      response.data.forEach(app => {
        // Check if jobId exists and has _id property
        if (app.jobId && app.jobId._id) {
          applicationMap[app.jobId._id] = app.status;
        }
      });
      setApplications(applicationMap);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (confirmDelete) {
      axios.delete(`http://localhost:3001/deleteuser/${id}`, {
        headers: {
          'x-user-role': role,
          'x-user-username': username
        }
      })
        .then(() => {
          fetchUsers();
        })
        .catch(err => {
          console.error('Error deleting job:', err);
          setError('Failed to delete job');
        });
    }
  };

  const handleApply = async (jobId) => {
    try {
      // Check if user has uploaded a resume
      const resumeFile = localStorage.getItem('resumeFile');
      if (!resumeFile) {
        alert('Please upload your resume in your profile before applying for jobs');
        navigate('/profile');
        return;
      }

      // Create FormData with resume file
      const formData = new FormData();
      
      // Prompt user to select resume file for this specific application
      const file = await new Promise((resolve) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf,.doc,.docx';
        input.onchange = (e) => resolve(e.target.files[0]);
        input.click();
      });

      if (!file) {
        alert('Please select a resume file to apply');
        return;
      }

      formData.append('resume', file);

      const response = await axios.post(`http://localhost:3001/apply/${jobId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-user-username': username,
          'x-user-role': role
        }
      });
      
      if (response.data.success) {
        // Refresh applications immediately
        await fetchApplications();
        alert('Application submitted successfully!');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      alert(error.response?.data?.message || 'Failed to apply for job');
    }
  };

  return (
    <>
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
              <h2 className="m-0 text-white fw-bold">Chakri Pao</h2>
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
            <div className="d-flex align-items-center">
              {!role ? (
                <Link 
                  to="/login" 
                  className="btn btn-primary"
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
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </Link>
              ) : (
                <>
                  {role === 'employer' && (
                    <Link 
                      to="/create" 
                      className="btn btn-success me-2"
                      style={{
                        borderRadius: '12px',
                        padding: '10px 20px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        background: 'linear-gradient(45deg, #2e7d32, #1b5e20)',
                        border: 'none',
                        boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)'
                      }}
                    >
                      <i className="bi bi-plus-circle me-2"></i>
                      Add Job
                    </Link>
                  )}
                  <ProfileMenu />
                </>
              )}
            </div>
          </div>

          <div className="mb-4">
            <div className="input-group input-group-lg shadow-sm">
              <span className="input-group-text bg-white border-0" style={{ borderRadius: '12px 0 0 12px' }}>
                <i className="bi bi-search text-primary"></i>
              </span>
              <input
                type="text"
                className="form-control border-0"
                placeholder="Type Job, Company or Role name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  borderRadius: '0 12px 12px 0',
                  boxShadow: 'none',
                  padding: '12px 16px'
                }}
              />
            </div>
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

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {users.map((user, index) => (
              <div key={index} className="col">
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
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.companyname}&backgroundColor=1976d2&textColor=ffffff`}
                          alt={user.companyname}
                          className="rounded-circle me-3"
                          style={{ 
                            width: '50px', 
                            height: '50px',
                            objectFit: 'cover',
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <h5 className="card-title text-primary fw-bold mb-0">{user.companyname}</h5>
                      </div>
                      <span 
                        className="badge rounded-pill"
                        style={{
                          backgroundColor: 'rgba(25, 118, 210, 0.1)',
                          color: '#1976d2',
                          padding: '8px 12px',
                          fontSize: '0.9rem'
                        }}
                      >
                        {user.vacancy} Vacancies
                      </span>
                    </div>
                    <h6 className="card-subtitle mb-3 text-muted">
                      <i className="bi bi-briefcase me-2"></i>
                      {user.jobrole}
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
                        Tk. {user.salary}
                      </span>
                    </div>
                    <p className="card-text text-muted">
                      <i className="bi bi-geo-alt me-2"></i>
                      {user.location}
                    </p>
                    <div className="d-flex gap-2 mt-3">
                      {role === 'employer' && user.createdBy === username && (
                        <>
                          <Link 
                            to={`/update/${user._id}`} 
                            className='btn btn-outline-primary btn-sm flex-grow-1'
                            style={{
                              borderRadius: '8px',
                              padding: '8px 16px',
                              fontSize: '0.9rem',
                              fontWeight: '500',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <i className="bi bi-pencil me-1"></i>
                            Update
                          </Link>
                          <button
                            className='btn btn-outline-danger btn-sm flex-grow-1'
                            onClick={() => handleDelete(user._id)}
                            style={{
                              borderRadius: '8px',
                              padding: '8px 16px',
                              fontSize: '0.9rem',
                              fontWeight: '500',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <i className="bi bi-trash me-1"></i>
                            Delete
                          </button>
                        </>
                      )}
                      {role === 'jobseeker' && (
                        <button
                          className={`btn btn-sm flex-grow-1 ${
                            applications[user._id] ? (
                              applications[user._id] === 'accepted' ? 'btn-success disabled' :
                              applications[user._id] === 'rejected' ? 'btn-danger disabled' :
                              'btn-warning disabled'
                            ) : 'btn-primary'
                          }`}
                          onClick={() => handleApply(user._id)}
                          disabled={applications[user._id]}
                          style={{
                            borderRadius: '8px',
                            padding: '8px 16px',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <i className={`bi ${
                            applications[user._id] ? (
                              applications[user._id] === 'accepted' ? 'bi-check-circle' :
                              applications[user._id] === 'rejected' ? 'bi-x-circle' :
                              'bi-clock'
                            ) : 'bi-send'
                          } me-1`}></i>
                          {applications[user._id] ? (
                            applications[user._id].charAt(0).toUpperCase() + applications[user._id].slice(1)
                          ) : 'Apply'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="text-grey text-center py-1 mt-auto w-100" style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        zIndex: 1000,
        fontSize: '1.05rem',
        letterSpacing: '0.5px',
        boxShadow: '0 -2px 12px rgba(25, 118, 210, 0.08)', 
        background: 'rgba(37, 37, 37, 0.17)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}>
         <span className="fw-bold">Chakri Pao™</span>, est. 2025
      </footer>
    </>
  );
}

export default Users;
