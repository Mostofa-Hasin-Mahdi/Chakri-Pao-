import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './Users';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import Login from './login';
import Register from './Register';
import Profile from './Profile';
import MyJobs from './MyJobs';
import MyApplications from './MyApplications';
import JobApplications from './JobApplications';

function App() {
  const [role, setRole] = useState(null); // 'employer', 'jobseeker', or null

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
