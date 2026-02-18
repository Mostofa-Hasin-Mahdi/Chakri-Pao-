import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Users from './users';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import MyJobs from './MyJobs';
import MyApplications from './MyApplications';
import JobApplications from './JobApplications';

function App() {
  const [role, setRole] = useState(null); // 'employer', 'jobseeker', or null
  const [isServerWaking, setIsServerWaking] = useState(true);

  useEffect(() => {
    // Ping the server on initial load to wake it up
    const wakeUpServer = async () => {
      try {
        await axios.get('/');
        setIsServerWaking(false);
      } catch (error) {
        console.log('Server wake-up error:', error);
        setIsServerWaking(false);
      }
    };
    wakeUpServer();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/login" element={<Login setRole={setRole} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/update/:id" element={<UpdateUser />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/jobs" element={<MyJobs />} />
          <Route path="/profile/applications" element={<MyApplications />} />
          <Route path="/applications/:jobId" element={<JobApplications />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
