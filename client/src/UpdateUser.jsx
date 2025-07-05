import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';

function UpdateUser() {
  const [company, setCompany] = useState('');
  const [jobrole, setJobrole] = useState('');
  const [salary, setSalary] = useState('');
  const [vacancy, setVacancy] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!role) {
      setError("You must be logged in to update a job");
      return;
    }

    axios.get(`http://localhost:3001/getuser/${id}`, {
      headers: {
        'x-user-role': role
      }
    })
      .then(res => {
        setCompany(res.data.companyname || '');
        setJobrole(res.data.jobrole || '');
        setSalary(res.data.salary || '');
        setVacancy(res.data.vacancy || '');
        setLocation(res.data.location || '');
      })
      .catch(err => {
        console.error('Error fetching job details:', err);
        setError('Failed to load job details');
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!role) {
      setError("You must be logged in to update a job");
      setIsLoading(false);
      return;
    }

    try {
      await axios.put(`http://localhost:3001/updateuser/${id}`, {
        companyname: company,
        jobrole: jobrole,
        salary: salary,
        vacancy: vacancy,
        location: location
      }, {
        headers: {
          'x-user-role': role,
          'x-user-username': username
        }
      });
      
      console.log('Job updated successfully');
      navigate('/');
    } catch (err) {
      console.error('Error updating job:', err);
      setError(err.response?.data?.message || 'Failed to update job');
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
                  <i className="bi bi-pencil-square me-2"></i>
                  Update Job
                </h2>
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
              
              <form onSubmit={handleUpdate}>
                <div className="mb-4">
                  <label className="form-label text-muted fw-medium">
                    <i className="bi bi-building me-2"></i>
                    Company Name
                  </label>
                  <input 
                    type="text" 
                    value={company} 
                    onChange={(e) => setCompany(e.target.value)} 
                    className='form-control form-control-lg'
                    placeholder="Enter company name"
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
                    <i className="bi bi-briefcase me-2"></i>
                    Job Role
                  </label>
                  <input 
                    type="text" 
                    value={jobrole} 
                    onChange={(e) => setJobrole(e.target.value)} 
                    className='form-control form-control-lg'
                    placeholder="Enter job role"
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
                    <i className="bi bi-currency-dollar me-2"></i>
                    Salary
                  </label>
                  <input 
                    type="number" 
                    value={salary} 
                    onChange={(e) => setSalary(e.target.value)} 
                    className='form-control form-control-lg'
                    placeholder="Enter salary"
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
                    <i className="bi bi-people me-2"></i>
                    Vacancy
                  </label>
                  <input 
                    type="number" 
                    value={vacancy} 
                    onChange={(e) => setVacancy(e.target.value)} 
                    className='form-control form-control-lg'
                    placeholder="Enter number of vacancies"
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
                    <i className="bi bi-geo-alt me-2"></i>
                    Location
                  </label>
                  <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    className='form-control form-control-lg'
                    placeholder="Enter job location"
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
                        Updating Job...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Update Job
                      </>
                    )}
                  </button>
                  
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary btn-lg"
                    onClick={() => navigate('/')}
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
                    <i className="bi bi-x-circle me-2"></i>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
