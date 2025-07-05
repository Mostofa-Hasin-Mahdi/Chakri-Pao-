import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfileMenu from './ProfileMenu';

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!role || role !== 'employer') {
      navigate('/');
      return;
    }
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    axios.get('http://localhost:3001')
      .then(result => {
        const myJobs = result.data.filter(job => job.createdBy === username);
        setJobs(myJobs);
      })
      .catch(err => {
        console.error('Error fetching jobs:', err);
        setError('Failed to fetch jobs');
      });
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
          fetchJobs();
        })
        .catch(err => {
          console.error('Error deleting job:', err);
          setError('Failed to delete job');
        });
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
            <h2 className="m-0 text-white fw-bold">My Job Posts</h2>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Link 
              to="/create" 
              className="btn btn-success"
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
              Post New Job
            </Link>
            <ProfileMenu />
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

        {jobs.length === 0 ? (
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
            <i className="bi bi-briefcase text-primary" style={{ fontSize: '3rem' }}></i>
            <h3 className="mt-3 text-primary">No Jobs Posted Yet</h3>
            <p className="text-muted">Start by posting your first job listing</p>
            <Link 
              to="/create" 
              className="btn btn-primary mt-3"
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
              <i className="bi bi-plus-circle me-2"></i>
              Post New Job
            </Link>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {jobs.map((job, index) => (
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
                      <h5 className="card-title text-primary fw-bold mb-0">{job.companyname}</h5>
                      <span 
                        className="badge rounded-pill"
                        style={{
                          backgroundColor: 'rgba(25, 118, 210, 0.1)',
                          color: '#1976d2',
                          padding: '8px 12px',
                          fontSize: '0.9rem'
                        }}
                      >
                        {job.vacancy} Vacancies
                      </span>
                    </div>
                    <h6 className="card-subtitle mb-3 text-muted">
                      <i className="bi bi-briefcase me-2"></i>
                      {job.jobrole}
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
                        Tk. {job.salary}
                      </span>
                    </div>
                    <p className="card-text text-muted">
                      <i className="bi bi-geo-alt me-2"></i>
                      {job.location}
                    </p>
                    <div className="d-flex gap-2 mt-3">
                      <Link 
                        to={`/update/${job._id}`} 
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
                        onClick={() => handleDelete(job._id)}
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
                      <Link
                        to={`/applications/${job._id}`}
                        className='btn btn-outline-info btn-sm flex-grow-1'
                        style={{
                          borderRadius: '8px',
                          padding: '8px 16px',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <i className="bi bi-file-earmark-text me-1"></i>
                        Applications
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyJobs; 