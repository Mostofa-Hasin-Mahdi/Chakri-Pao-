import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-link text-white text-decoration-none dropdown-toggle"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="bi bi-person-circle me-2"></i>
        {username}
      </button>
      <div className={`dropdown-menu dropdown-menu-end ${isOpen ? 'show' : ''}`}>
        <Link to="/profile" className="dropdown-item">
          <i className="bi bi-person me-2"></i>
          Profile
        </Link>
        {role === 'jobseeker' && (
          <Link to="/profile/applications" className="dropdown-item">
            <i className="bi bi-file-earmark-text me-2"></i>
            My Applications
          </Link>
        )}
        {role === 'employer' && (
          <Link to="/profile/jobs" className="dropdown-item">
            <i className="bi bi-briefcase me-2"></i>
            My Jobs
          </Link>
        )}
        <div className="dropdown-divider"></div>
        <button className="dropdown-item" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileMenu; 