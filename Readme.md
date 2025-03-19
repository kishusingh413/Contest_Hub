# **Contest Tracker** 🚀  
A web application that tracks coding contests from platforms like **Codeforces, CodeChef, and LeetCode**. Users can **filter contests, bookmark events, add solutions, and manage accounts** with authentication and authorization.

## **Features** 🛠️
- **Upcoming & Past Contests**: View and filter coding contests from multiple platforms.
- **User Authentication**: Secure login, registration, and authentication.
- **Bookmarking & Solutions**: Save contests and attach solution links.
- **Dark/Light Mode**: Theme toggle for better UI experience.
- **Mobile Responsive**: Fully responsive across different screen sizes.

---

## **Tech Stack** 🏗️  
### **Frontend**  
- **React.js** (with Hooks & Context API)  
- **React Router** (for navigation)  
- **Axios** (for API calls)  
- **Tailwind CSS / Styled Components** (for styling)  

### **Backend**  
- **Node.js & Express.js** (REST API)  
- **MongoDB** (Database)  
- **Mongoose** (ODM for MongoDB)  
- **JWT Authentication** (Secure login & registration)  
- **bcrypt.js** (Password hashing)  
- **Cheerio & Puppeteer** (Web scraping for contests)  

---

## **Installation & Setup** 🚀  
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/kishusingh413/Contest_Hub.git
cd Contest_Hub


## **API Endpoints** 🌐

🔹 Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login & receive JWT token
GET	/api/auth/user	Get current user profile
POST	/api/auth/logout	Logout user

🔹 Contests
Method	Endpoint	Description
GET	/api/contests	Fetch all contests
GET	/api/contests/:id	Get contest details by ID
POST	/api/contests/bookmark	Bookmark a contest
GET	/api/contests/bookmarks	Get all bookmarked contests


🔹 Solutions
Method	Endpoint	Description
POST	/api/solutions/add	Add a solution for a contest
GET	/api/solutions/:contestId	Get all solutions for a contest


Usage Instructions 🛠️

Sign Up / Login

Register a new account.
Log in to access features like bookmarking & adding solutions.
View Contests

Browse upcoming and past contests.
Filter by platform (Codeforces, CodeChef, LeetCode).
Bookmark Contests

Click the Bookmark button to save contests.
View all saved contests under the Bookmarks section.
Add Solutions

After the contest, add solution links from YouTube or GitHub.
View other users' solutions.
Dark/Light Mode

Click on the 🌙 Dark Mode / ☀️ Light Mode button to switch themes.
