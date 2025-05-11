const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');
const UsersInfoModel = require('./models/usersinfo');
const ApplicationModel = require('./models/Applications');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud");

// Middleware to check authentication for protected routes
const authenticateUser = (req, res, next) => {
  const role = req.headers['x-user-role'];
  if (!role) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  next();
};

// Middleware to check if user is an employer
const isEmployer = (req, res, next) => {
  const role = req.headers['x-user-role'];
  if (role !== 'employer') {
    return res.status(403).json({ message: 'Access denied. Employer only.' });
  }
  next();
};

// Get all job posts (public access)
app.get('/', (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

// Create job post (employer only)
app.post("/createuser", authenticateUser, isEmployer, (req, res) => {
  const jobData = {
    ...req.body,
    createdBy: req.headers['x-user-username']
  };
  UserModel.create(jobData)
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

// Register (hash kora password)
app.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // ekhane 10 ta hash kore 
    const user = await UsersInfoModel.create({
      username,
      password: hashedPassword,
      role
    });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    console.log('Received login request:', req.body);
    const { username, password } = req.body;
    
    if (!username || !password) {
      console.log('Missing username or password');
      return res.status(400).json({ 
        success: false, 
        message: "Username and password are required" 
      });
    }

    console.log('Searching for user:', username);
    const user = await UsersInfoModel.findOne({ username });
    
    if (!user) {
      console.log('User not found in database');
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    console.log('User found, comparing password');
    const isPasswordValid = await bcrypt.compare(password, user.password); //hash password er shathe comapre kortese
    
    if (!isPasswordValid) {
      console.log('Password comparison failed');
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    console.log('Login successful, sending response');
    res.json({ 
      success: true, 
      role: user.role,
      message: "Login successful"
    });
  } catch (err) {
    console.error('Detailed login error:', {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    res.status(500).json({ 
      success: false, 
      message: "An error occurred during login",
      error: err.message 
    });
  }
});

// Update job post (employer only, and only their own posts)
app.put("/updateuser/:id", authenticateUser, isEmployer, async (req, res) => {
  try {
    const job = await UserModel.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if the job belongs to the current employer
    if (job.createdBy !== req.headers['x-user-username']) {
      return res.status(403).json({ message: 'You can only update your own jobs' });
    }

    const updatedJob = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//to fetch a single user by ID 
app.get('/getuser/:id', (req, res) => {
  UserModel.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

// Delete job post (employer only, and only their own posts)
app.delete("/deleteuser/:id", authenticateUser, isEmployer, async (req, res) => {
  try {
    const job = await UserModel.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if the job belongs to the current employer
    if (job.createdBy !== req.headers['x-user-username']) {
      return res.status(403).json({ message: 'You can only delete your own jobs' });
    }

    await UserModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Debug endpoint to check users
app.get("/debug/users", async (req, res) => {
  try {
    const users = await UsersInfoModel.find({});
    console.log('All users in database:', users);
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: err.message });
  }
});

// apply for a job
app.post("/apply/:jobId", authenticateUser, async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const jobseeker = req.headers['x-user-username'];
    const role = req.headers['x-user-role'];

    if (role !== 'jobseeker') {
      return res.status(403).json({ message: 'Only job seekers can apply for jobs' });
    }

    // check if job exists
    const job = await UserModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // jodi already applied kore thake
    const existingApplication = await ApplicationModel.findOne({
      jobId,
      jobseeker
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const application = await ApplicationModel.create({
      jobId,
      jobseeker
    });

    res.json({ success: true, application });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get applications for a job (employer only)
app.get("/applications/:jobId", authenticateUser, isEmployer, async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const username = req.headers['x-user-username'];

    // Check if job belongs to the employer
    const job = await UserModel.findById(jobId);
    if (!job || job.createdBy !== username) {
      return res.status(403).json({ message: 'You can only view applications for your own jobs' });
    }

    const applications = await ApplicationModel.find({ jobId })
      .populate('jobId', 'companyname jobrole salary location');

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's applications (jobseeker only)
app.get("/my-applications", authenticateUser, async (req, res) => {
  try {
    const jobseeker = req.headers['x-user-username'];
    const role = req.headers['x-user-role'];

    if (role !== 'jobseeker') {
      return res.status(403).json({ message: 'Only job seekers can view their applications' });
    }

    const applications = await ApplicationModel.find({ jobseeker })
      .populate('jobId', 'companyname jobrole salary location');

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update application status (employer only)
app.put("/applications/:id/status", authenticateUser, isEmployer, async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    const username = req.headers['x-user-username'];

    const application = await ApplicationModel.findById(applicationId)
      .populate('jobId');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if job belongs to the employer
    if (application.jobId.createdBy !== username) {
      return res.status(403).json({ message: 'You can only update applications for your own jobs' });
    }

    application.status = status;
    await application.save();

    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001...");
});
