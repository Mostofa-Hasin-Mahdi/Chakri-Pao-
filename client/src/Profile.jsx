import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfileMenu from './ProfileMenu';

function Profile() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username');
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    appliedJobs: 0,
    interviewCalls: 0
  });

  useEffect(() => {
    if (!role) {
      navigate('/login');
      return;
    }

    const fetchStats = async () => {
      try {
        if (role === 'employer') {
          // Fetch employer's jobs
          const jobsResponse = await axios.get('http://localhost:3001');
          const myJobs = jobsResponse.data.filter(job => job.createdBy === username);
          
          // Fetch applications for each job
          let totalApplications = 0;
          for (const job of myJobs) {
            const applicationsResponse = await axios.get(`http://localhost:3001/applications/${job._id}`, {
              headers: {
                'x-user-role': role,
                'x-user-username': username
              }
            });
            totalApplications += applicationsResponse.data.length;
          }

          setStats({
            totalJobs: myJobs.length,
            totalApplications: totalApplications
          });
        } else if (role === 'jobseeker') {
          // Fetch jobseeker's applications
          const applicationsResponse = await axios.get('http://localhost:3001/my-applications', {
            headers: {
              'x-user-role': role,
              'x-user-username': username
            }
          });

          const interviewCalls = applicationsResponse.data.filter(app => app.status === 'accepted').length;

          setStats({
            appliedJobs: applicationsResponse.data.length,
            interviewCalls: interviewCalls
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [role, username]);

  if (!role) {
    navigate('/login');
    return null;
  }

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
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div 
              className="bg-white rounded-4 p-4 p-md-5 shadow-lg"
              style={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
              }}
            >
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h2 className="m-0 text-primary fw-bold">
                  <i className="bi bi-person-circle me-2"></i>
                  Profile
                </h2>
                <ProfileMenu />
              </div>

              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <div 
                    className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-3"
                    style={{ width: '60px', height: '60px' }}
                  >
                    <i className="bi bi-person-fill text-white" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <div>
                    <h3 className="m-0 fw-bold">{username}</h3>
                    <p className="text-muted m-0">
                      <i className="bi bi-person-badge me-2"></i>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </p>
                  </div>
                </div>
              </div>

              {role === 'employer' && (
                <div className="mb-4">
                  <div className="row g-3">
                    <div className="col-6">
                      <div 
                        className="p-3 rounded-3"
                        style={{
                          backgroundColor: 'rgba(25, 118, 210, 0.1)',
                          border: '1px solid rgba(25, 118, 210, 0.2)'
                        }}
                      >
                        <h6 className="text-primary mb-1">Jobs Posted</h6>
                        <h3 className="m-0 fw-bold">{stats.totalJobs}</h3>
                      </div>
                    </div>
                    <div className="col-6">
                      <div 
                        className="p-3 rounded-3"
                        style={{
                          backgroundColor: 'rgba(46, 125, 50, 0.1)',
                          border: '1px solid rgba(46, 125, 50, 0.2)'
                        }}
                      >
                        <h6 className="text-success mb-1">Applications Received</h6>
                        <h3 className="m-0 fw-bold">{stats.totalApplications}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {role === 'jobseeker' && (
                <div className="mb-4">
                  <div className="row g-3">
                    <div className="col-6">
                      <div 
                        className="p-3 rounded-3"
                        style={{
                          backgroundColor: 'rgba(25, 118, 210, 0.1)',
                          border: '1px solid rgba(25, 118, 210, 0.2)'
                        }}
                      >
                        <h6 className="text-primary mb-1">Jobs Applied</h6>
                        <h3 className="m-0 fw-bold">{stats.appliedJobs}</h3>
                      </div>
                    </div>
                    <div className="col-6">
                      <div 
                        className="p-3 rounded-3"
                        style={{
                          backgroundColor: 'rgba(46, 125, 50, 0.1)',
                          border: '1px solid rgba(46, 125, 50, 0.2)'
                        }}
                      >
                        <h6 className="text-success mb-1">Interview Calls</h6>
                        <h3 className="m-0 fw-bold">{stats.interviewCalls}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="d-grid gap-3">
                {role === 'employer' && (
                  <Link 
                    to="/profile/jobs" 
                    className="btn btn-primary btn-lg"
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
                    <i className="bi bi-briefcase me-2"></i>
                    My Job Posts
                  </Link>
                )}

                {role === 'jobseeker' && (
                  <Link 
                    to="/profile/applications" 
                    className="btn btn-primary btn-lg"
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
                    <i className="bi bi-file-earmark-text me-2"></i>
                    My Applications
                  </Link>
                )}

                <Link 
                  to="/" 
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
                  <i className="bi bi-house me-2"></i>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 