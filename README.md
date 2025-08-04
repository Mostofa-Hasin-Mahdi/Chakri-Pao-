# 🎯 Chakri Pao - Job Portal Application

A modern, full-stack job portal built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that connects job seekers with employers through an intuitive and feature-rich platform.
<img width="823" height="289" alt="image" src="https://github.com/user-attachments/assets/5763df09-b262-4ce3-8ae9-c328d7c8f5cf" />


![Chakri Pao](https://img.shields.io/badge/Chakri%20Pao-Job%20Portal-blue?style=for-the-badge&logo=react)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge&logo=mongodb)

## 🌟 Key Features

### 👥 **Dual User System**
- **Job Seekers**: Browse jobs, upload resumes, apply for positions, track application status
- **Employers**: Post job listings, review applications, manage candidates, download resumes
- <img width="710" height="788" alt="image" src="https://github.com/user-attachments/assets/79539d92-12a0-42b8-8eb7-48304bf2f1e6" />


### 🔍 **Advanced Job Search**
- Real-time search functionality
- Filter by company name, job role, or location
- <img width="1331" height="650" alt="image" src="https://github.com/user-attachments/assets/12bc38c7-139f-480c-aff6-3eafc95d4195" />


### 📄 **Resume Management System**
- **Upload Support**: PDF, DOC, DOCX files (up to 5MB)
- **Easy Access**: Employers can download and review resumes
- **File Validation**: Client and server-side file type/size validation
- <img width="676" height="833" alt="image" src="https://github.com/user-attachments/assets/6af61de5-3601-44ad-a440-431daed542c9" />


### 📊 **Application Tracking**
- **Real-time Status Updates**: Pending → Accepted/Rejected
- **Application History**: Complete timeline of all applications
- **For Job Seeker**:
- <img width="1311" height="810" alt="image" src="https://github.com/user-attachments/assets/6ec585a4-a941-4e69-8e69-372b21e318f3" />


### 🎨 **Modern UI/UX**
- **Gradient Backgrounds**: Animated gradient backgrounds
- **Glass Morphism**: Modern card designs with backdrop blur
- **Hover Effects**: Interactive elements with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Bootstrap Icons**: Beautiful iconography throughout

### 🔐 **Security Features**
- **Password Hashing**: Bcrypt encryption for user passwords
- **Role-based Access**: Separate permissions for job seekers and employers
- **File Upload Security**: File type and size validation

## 🛠 Technology Stack

### **Frontend**
- **React.js 19** - Modern UI framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Bootstrap 5** - CSS framework for responsive design
- **Vite** - Fast build tool and development server

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Multer** - File upload middleware
- **Bcrypt** - Password hashing

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

## 📱 User Guide

### **For Job Seekers**

1. **Registration & Login**
   - Register with username, password, and role as "jobseeker"
   - Login to access job portal features

2. **Profile Setup**
   - Upload resume (PDF/DOC/DOCX, max 5MB)
   - View application statistics
   - Access application history

3. **Job Search & Application**
   - Browse available jobs with search functionality
   - Click "Apply" to submit application with resume
   - Track application status (Pending/Accepted/Rejected)

4. **Application Management**
   - View all applications in "My Applications"
   - See detailed job information and application dates
   - Receive status updates and notifications

### **For Employers**

1. **Registration & Login**
   - Register with username, password, and role as "employer"
   - Login to access employer dashboard

2. **Job Posting**
   - Create new job listings with company details
   - Specify job role, salary, vacancy, and location
   - Manage existing job posts

3. **Application Review**
   - View applications for each job posting
   - Download candidate resumes
   - Review application details and dates

4. **Candidate Management**
   - Accept applications (Call for Interview)
   - Reject applications
   - Track application status changes



### **Installation**

1. **Clone the repository**
   ```bash
   git clone <https://github.com/Mostofa-Hasin-Mahdi/Chakri-Pao->
   cd mern-crud-job-portal
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up MongoDB**
   - Start MongoDB service locally, or
   - Update connection string in `server/index.js` for MongoDB Atlas

5. **Start the application**
   ```bash
   # Terminal 1 - Start server
   cd server
   npm start
   
   # Terminal 2 - Start client
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Mostofa Hasin Mahdi**
- **Established**: 2025
- **Technology**: MERN Stack
- **Purpose**: Modern job portal for job seekers and employers

## 🙏 Acknowledgments

- **Bootstrap** for the responsive UI framework
- **React** for the amazing frontend library
- **MongoDB** for the flexible database solution
- **Express.js** for the robust backend framework

---

⭐ **Star this repository if you found it helpful!**

🔗 **Connect with us**: [GitHub](https://github.com/Mostofa-Hasin-Mahdi) | [LinkedIn](https://linkedin.com/in/mostofa-hasin-mahdi-76777a182)

---

*Built with ❤️ using the MERN Stack* 
