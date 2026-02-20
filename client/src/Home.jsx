import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [role, setRole] = useState(localStorage.getItem('role'));
    const [username, setUsername] = useState(localStorage.getItem('username'));

    useEffect(() => {
        // Wake up the server
        axios.get('/').catch(() => { });
    }, []);

    return (
        <div
            className="min-vh-100 position-relative d-flex flex-column"
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

            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-transparent pt-4 px-4">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            style={{
                                width: '50px',
                                height: '50px',
                                filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
                            }}
                        />
                        <span className="ms-3 fw-bold fs-3">Chakri Pao</span>
                    </Link>

                    <div className="d-flex align-items-center gap-3">
                        {role ? (
                            <Link
                                to="/jobs"
                                className="btn btn-outline-light px-4 py-2 rounded-pill fw-bold"
                            >
                                Browse Jobs
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="btn btn-outline-light px-4 py-2 rounded-pill fw-bold"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn btn-light px-4 py-2 rounded-pill fw-bold text-primary"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="container flex-grow-1 d-flex align-items-center justify-content-center py-5">
                <div className="row align-items-center w-100">
                    <div className="col-lg-6 text-white mb-5 mb-lg-0">
                        <h1 className="display-3 fw-bold mb-4">
                            Your Dream Job is <br />
                            <span className="text-info">One Click Away</span>
                        </h1>
                        <p className="lead mb-5 opacity-90">
                            Chakri Pao bridges the gap between talented job seekers and
                            top employers. Whether you're hiring specifically or looking
                            for your next big opportunity, we've got you covered.
                        </p>
                        <div className="d-flex gap-3 flex-wrap">
                            <Link
                                to="/jobs"
                                className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-bold text-primary shadow-lg"
                                style={{ transition: 'transform 0.2s' }}
                                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                Find Jobs
                                <i className="bi bi-arrow-right ms-2"></i>
                            </Link>
                            <Link
                                to="/register"
                                className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill fw-bold"
                            >
                                Post a Job
                            </Link>
                        </div>


                    </div>

                    <div className="col-lg-6">
                        <div
                            className="p-4 rounded-4 shadow-lg position-relative"
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                transform: 'perspective(1000px) rotateY(-10deg) rotateX(5deg)',
                            }}
                        >
                            <div className="bg-white rounded-3 p-4 shadow-sm mb-3 opacity-90">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="bg-primary rounded-circle p-2 me-3">
                                        <i className="bi bi-code-slash text-white"></i>
                                    </div>
                                    <div>
                                        <h5 className="mb-0 fw-bold text-dark">Senior React Developer</h5>
                                        <small className="text-muted">TechCorp Systems</small>
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    <span className="badge bg-light text-dark">Remote</span>
                                    <span className="badge bg-light text-dark">Full-time</span>
                                    <span className="badge bg-light text-dark">৳80k - ৳120k</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-3 p-4 shadow-sm opacity-90" style={{ transform: 'translateX(20px)' }}>
                                <div className="d-flex align-items-center mb-3">
                                    <div className="bg-success rounded-circle p-2 me-3">
                                        <i className="bi bi-graph-up text-white"></i>
                                    </div>
                                    <div>
                                        <h5 className="mb-0 fw-bold text-dark">Marketing Manager</h5>
                                        <small className="text-muted">Creative Solutions</small>
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    <span className="badge bg-light text-dark">On-site</span>
                                    <span className="badge bg-light text-dark">Contract</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
