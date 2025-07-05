import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/jobs');
      setJobs(response.data);
      setFilteredJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = jobs.filter(job => 
      job.companyname.toLowerCase().includes(term) ||
      job.jobrole.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term)
    );
    setFilteredJobs(filtered);
  };

  const handleApply = async (jobId) => {
    try {
      const response = await axios.post(`http://localhost:3001/apply/${jobId}`, {}, {
        headers: {
          'x-user-username': username,
          'x-user-role': userRole
        }
      });
      if (response.data.success) {
        alert('Application submitted successfully!');
        fetchJobs(); // Refresh the jobs list
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error applying for job');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Available Jobs</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="row">
        {filteredJobs.map((job) => (
          <div key={job._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{job.companyname}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{job.jobrole}</h6>
                <p className="card-text">
                  <strong>Salary:</strong> {job.salary}<br />
                  <strong>Location:</strong> {job.location}
                </p>
                {userRole === 'jobseeker' && (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleApply(job._id)}
                  >
                    Apply Now
                  </button>
                )}
                {userRole === 'employer' && job.createdBy === username && (
                  <button
                    className="btn btn-info"
                    onClick={() => navigate(`/applications/${job._id}`)}
                  >
                    View Applications
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs; 