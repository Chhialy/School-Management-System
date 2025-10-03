# 📚 School Management System# 📚 School Management System# 📚 School Management System



A comprehensive web application for managing students, teachers, and courses in educational institutions. Built with Next.js, React, TypeScript, and MongoDB.



![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)A comprehensive web application for managing students, teachers, and courses in educational institutions. Built with modern web technologies and featuring a stunning glass morphism UI with smooth animations.A comprehensive web application for managing students, teachers, and courses in educational institutions. Built with modern web technologies for a seamless user experience.

![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)

![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)



## ✨ Features![School Management System](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)![School Management System](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)



### 🎓 Student Management![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?style=for-the-badge&logo=mongodb)

- Create, read, update, and delete student records

- Store personal information, contact details, and academic data![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

- Unique student ID system

- Track student grades and academic levels![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-cyan?style=for-the-badge&logo=tailwindcss)![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-cyan?style=for-the-badge&logo=tailwindcss)

- Search functionality to find students quickly



### 👨‍🏫 Teacher Management

- Manage teacher profiles and information## ✨ Features## ✨ Features

- Organize teachers by departments and subjects

- Store contact information

- Track subject assignments

### 🎓 Student Management### 🎓 Student Management

### 📖 Course Management

- Create and manage academic courses- **Complete CRUD Operations**: Create, read, update, and delete student records- **Complete CRUD Operations**: Create, read, update, and delete student records

- Assign teachers to courses

- Unique course codes- **Detailed Student Profiles**: Store personal information, contact details, and academic data- **Detailed Student Profiles**: Store personal information, contact details, and academic data

- Track course credits and duration

- Store course descriptions- **Student ID System**: Unique identification for each student- **Student ID System**: Unique identification for each student



### 🎯 Additional Features- **Grade Management**: Track student grades and academic levels- **Grade Management**: Track student grades and academic levels

- Responsive design for all devices

- Real-time updates- **Search & Filter**: Quickly find students with advanced search functionality- **Search & Filter**: Quickly find students with advanced search functionality

- Database health monitoring

- Form validation- **Real-time Updates**: Instant updates with toast notifications

- Error handling

- Toast notifications### 👨‍🏫 Teacher Management



## 🚀 Technology Stack### 👨‍🏫 Teacher Management- **Teacher Profiles**: Comprehensive teacher information management



- **Frontend**: Next.js 15.5.2, React 19, TypeScript- **Teacher Profiles**: Comprehensive teacher information management- **Department Organization**: Organize teachers by departments and subjects

- **Backend**: Next.js API Routes, Node.js

- **Database**: MongoDB Atlas (Cloud Database)- **Department Organization**: Organize teachers by departments and subjects- **Contact Management**: Store and manage teacher contact information

- **Styling**: Tailwind CSS 4.0

- **Contact Management**: Store and manage teacher contact information- **Subject Assignment**: Link teachers to their specialized subjects

## 🛠️ Installation & Setup

- **Subject Assignment**: Link teachers to their specialized subjects

### Prerequisites

- Node.js 18+ installed- **Department Badges**: Visual indicators for departments and subjects### 📖 Course Management

- MongoDB Atlas account (free tier available)

- Git- **Course Creation**: Create and manage academic courses



### 1. Clone the Repository### 📖 Course Management- **Teacher Assignment**: Assign qualified teachers to courses

```bash

git clone https://github.com/your-username/school-management-system.git- **Course Creation**: Create and manage academic courses- **Student Enrollment**: Track which students are enrolled in each course

cd school-management-system

```- **Teacher Assignment**: Assign qualified teachers to courses- **Schedule Management**: Set and manage course schedules



### 2. Install Dependencies- **Course Codes**: Unique identification system for courses- **Credit System**: Track course credits and duration

```bash

npm install- **Credit System**: Track course credits and duration

```

- **Detailed Descriptions**: Store comprehensive course information### 🎯 Additional Features

### 3. Environment Setup

Create a `.env.local` file in the root directory:- **Responsive Design**: Works perfectly on all devices (desktop, tablet, mobile)

```env

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/school-management### 🎯 Additional Features- **Real-time Updates**: Instant updates across all operations

NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=your-secret-key-here- **Responsive Design**: Works perfectly on all devices (desktop, tablet, mobile)- **Database Health Monitoring**: Monitor MongoDB connection status

```

- **Real-time Updates**: Instant updates across all operations- **Form Validation**: Client and server-side validation for data integrity

### 4. MongoDB Atlas Setup

- **Database Health Monitoring**: Monitor MongoDB connection status- **Error Handling**: Comprehensive error handling with user-friendly messages

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. Create a new cluster (M0 Sandbox - Free tier)- **Form Validation**: Client and server-side validation for data integrity- **Loading States**: Smooth loading indicators for better UX

3. Create a database user with username and password

4. Whitelist your IP address (use `0.0.0.0/0` for development)- **Error Handling**: Comprehensive error handling with user-friendly messages- **Toast Notifications**: Real-time feedback for all operations

5. Get your connection string and update `.env.local`

- **Loading States**: Smooth loading indicators for better UX

### 5. Run the Application

- **Toast Notifications**: Real-time feedback for all operations with glass morphism effect## 🚀 Technology Stack

**Development Mode:**

```bash

npm run dev

```## 🎨 UI/UX Features- **Frontend**: Next.js 15.5.2, React 19, TypeScript

Access the application at `http://localhost:3000`

- **Backend**: Next.js API Routes, Node.js

**Production Build:**

```bash### Modern Glass Morphism Design- **Database**: MongoDB with native driver

npm run build

npm start- **Animated Gradient Background**: Beautiful animated gradient backdrop (purple → pink → blue) across all pages- **Styling**: Tailwind CSS 4.0

```

- **Glass Effect Cards**: Translucent cards with backdrop blur for a modern, elegant look- **Forms**: React Hook Form with Zod validation

## 📁 Project Structure

- **Fixed Glass Navbar**: Sticky navigation with glass effect and white text- **UI Components**: Custom components with Headless UI

```

school-management-system/- **Smooth Animations**: - **Icons**: Lucide React

├── src/

│   ├── app/  - Fade-in animations (0.6s) for page loads- **Notifications**: React Hot Toast

│   │   ├── api/              # API routes

│   │   │   ├── courses/      # Course endpoints  - Stagger animations for card lists with sequential delays

│   │   │   ├── health/       # Health check

│   │   │   ├── students/     # Student endpoints  - Card hover effects with lift (-5px) and scale (1.02)## 🛠️ Installation & Setup

│   │   │   └── teachers/     # Teacher endpoints

│   │   ├── courses/          # Courses page  - Pulse animations for status indicators

│   │   ├── students/         # Students page

│   │   ├── teachers/         # Teachers page  - Shimmer effects for loading states### Prerequisites

│   │   ├── layout.tsx        # Root layout

│   │   ├── page.tsx          # Dashboard  - 15-second animated background gradient- Node.js 18+ installed

│   │   └── globals.css       # Global styles

│   ├── components/           # Shared components- MongoDB database (local or cloud)

│   │   ├── Navbar.tsx

│   │   └── ui/               # UI components### Color Themes- Git

│   └── lib/

│       ├── mongodb.ts        # MongoDB connection- **Students**: Blue theme (`bg-blue-500/30`, `border-blue-300`)

│       ├── schemas.ts        # Data schemas

│       └── utils.ts          # Utility functions- **Teachers**: Green theme (`bg-green-500/30`, `border-green-300`)### 1. Clone the Repository

├── public/                   # Static assets

├── .env.local                # Environment variables- **Courses**: Purple theme (`bg-purple-500/30`, `border-purple-300`)```bash

├── next.config.ts            # Next.js configuration

├── package.json              # Dependencies- **Dashboard**: Multi-colored badges with glass effectsgit clone https://github.com/your-username/school-management-system.git

└── tsconfig.json             # TypeScript configuration

```cd school-management-system



## 🔌 API Endpoints### Responsive Navigation```



### Health Check- Fixed glass navbar with backdrop blur (`backdrop-filter: blur(10px)`)

```

GET /api/health- Active page highlighting with white text### 2. Install Dependencies

```

- Mobile-friendly responsive design```bash

### Students

```- Smooth transitions and hover effectsnpm install

GET    /api/students          # Get all students

POST   /api/students          # Create a new student- z-index hierarchy for proper layering```

GET    /api/students/:id      # Get student by ID

PUT    /api/students/:id      # Update student

DELETE /api/students/:id      # Delete student

```## 🚀 Technology Stack### 3. Environment Setup



**Student Data:**Create a `.env.local` file in the root directory:

- Student ID

- Name- **Frontend**: Next.js 15.5.2, React 19, TypeScript```env

- Email

- Phone- **Backend**: Next.js API Routes, Node.js# MongoDB Connection String

- Grade

- Address- **Database**: MongoDB Atlas (Cloud Database)MONGODB_URI=mongodb://localhost:27017/school-management



### Teachers- **Styling**: Tailwind CSS 4.0 with custom animations

```

GET    /api/teachers          # Get all teachers- **Forms**: React Hook Form with Zod validation# Or for MongoDB Atlas:

POST   /api/teachers          # Create a new teacher

GET    /api/teachers/:id      # Get teacher by ID- **UI Components**: Custom components (Button, Card, Input, Select, Textarea, Modal, Loading)# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/school-management

PUT    /api/teachers/:id      # Update teacher

DELETE /api/teachers/:id      # Delete teacher- **Icons**: Lucide React

```

- **Notifications**: React Hot Toast with glass morphism styling# Next.js Configuration

**Teacher Data:**

- Name- **Build Tool**: Turbopack (Next.js 15)NEXTAUTH_URL=http://localhost:3000

- Email

- PhoneNEXTAUTH_SECRET=your-secret-key-here

- Department

- Subject## 🛠️ Installation & Setup```



### Courses

```

GET    /api/courses           # Get all courses### Prerequisites### 4. Database Setup

POST   /api/courses           # Create a new course

GET    /api/courses/:id       # Get course by ID- Node.js 18+ installedThe application will automatically create the necessary collections when you start using it. No manual database setup required!

PUT    /api/courses/:id       # Update course

DELETE /api/courses/:id       # Delete course- MongoDB Atlas account (free tier available) or local MongoDB

```

- Git### 5. Run the Application

**Course Data:**

- Course Code

- Name

- Description### 1. Clone the Repository**Development Mode:**

- Credits

- Assigned Teacher```bash```bash



## 🗄️ Databasegit clone https://github.com/your-username/school-management-system.gitnpm run dev



The application uses MongoDB with three main collections:cd school-management-system

- **students** - Student records```

- **teachers** - Teacher profiles

- **courses** - Course information### 2. Install Dependencies

```bash

Collections are automatically created when the application starts.npm install

```

## 🚀 Deployment

### 3. Environment Setup

### Vercel (Recommended)Create a `.env.local` file in the root directory:

1. Push code to GitHub```env

2. Import repository on [Vercel](https://vercel.com)# MongoDB Connection String (Required)

3. Add environment variables (MONGODB_URI, NEXTAUTH_URL, NEXTAUTH_SECRET)MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/school-management

4. Deploy

# Next.js Configuration (Optional)

## 📦 Available ScriptsNEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=your-secret-key-here

```bash```

npm run dev          # Start development server

npm run build        # Build for production### 4. MongoDB Atlas Setup (Recommended)

npm start            # Start production server

npm run lint         # Run ESLint1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

```2. Create a new cluster (M0 Sandbox - Free tier)

3. Create a database user:

## 🤝 Contributing   - Go to "Database Access"

   - Click "Add New Database User"

1. Fork the repository   - Set username and password

2. Create a feature branch (`git checkout -b feature/AmazingFeature`)   - Set privileges to "Read and write to any database"

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)4. Whitelist your IP address:

4. Push to the branch (`git push origin feature/AmazingFeature`)   - Go to "Network Access"

5. Open a Pull Request   - Click "Add IP Address"

   - Use `0.0.0.0/0` to allow from anywhere (for development)

## 📝 License5. Get your connection string:

   - Go to "Database" → "Connect"

This project is open source and available under the MIT License.   - Choose "Connect your application"

   - Copy the connection string

## 📧 Support   - Replace `<password>` with your database user password

   - Replace `<database>` with your database name (e.g., `school-management`)

For questions or issues, please open an issue on GitHub.

**Connection String Format:**

---```

mongodb+srv://<username>:<password>@cluster.mongodb.net/<database-name>

Built with Next.js, React, TypeScript, and MongoDB```


### 5. Run the Application

**Development Mode:**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

**Production Build:**
```bash
npm run build
npm start
```

## 📁 Project Structure

```
school-management-system/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── courses/      # Course endpoints
│   │   │   │   ├── route.ts  # GET, POST courses
│   │   │   │   └── [id]/     # GET, PUT, DELETE by ID
│   │   │   ├── health/       # Health check endpoint
│   │   │   ├── students/     # Student endpoints
│   │   │   │   ├── route.ts  # GET, POST students
│   │   │   │   └── [id]/     # GET, PUT, DELETE by ID
│   │   │   └── teachers/     # Teacher endpoints
│   │   │       ├── route.ts  # GET, POST teachers
│   │   │       └── [id]/     # GET, PUT, DELETE by ID
│   │   ├── courses/          # Courses page
│   │   │   ├── page.tsx      # Main courses page
│   │   │   └── components/   
│   │   │       └── CourseForm.tsx  # Course form component
│   │   ├── students/         # Students page
│   │   │   ├── page.tsx      # Main students page
│   │   │   └── components/   
│   │   │       └── StudentForm.tsx  # Student form component
│   │   ├── teachers/         # Teachers page
│   │   │   ├── page.tsx      # Main teachers page
│   │   │   └── components/   
│   │   │       └── TeacherForm.tsx  # Teacher form component
│   │   ├── layout.tsx        # Root layout with navbar
│   │   ├── page.tsx          # Dashboard/Home page
│   │   ├── globals.css       # Global styles & animations
│   │   └── favicon.ico       # Site favicon
│   ├── components/           # Shared components
│   │   ├── Navbar.tsx        # Navigation component
│   │   └── ui/               # UI components
│   │       ├── button.tsx    # Button component
│   │       ├── card.tsx      # Card component
│   │       ├── input.tsx     # Input component
│   │       ├── loading.tsx   # Loading component
│   │       ├── modal.tsx     # Modal component
│   │       ├── select.tsx    # Select component
│   │       └── textarea.tsx  # Textarea component
│   └── lib/
│       ├── mongodb.ts        # MongoDB connection setup
│       ├── schemas.ts        # Data validation schemas
│       └── utils.ts          # Utility functions
├── public/                   # Static assets
├── .env.local                # Environment variables (create this)
├── .gitignore                # Git ignore file
├── eslint.config.mjs         # ESLint configuration
├── next.config.ts            # Next.js configuration
├── package.json              # Dependencies and scripts
├── postcss.config.mjs        # PostCSS configuration
├── README.md                 # This file
└── tsconfig.json             # TypeScript configuration
```

## 🔌 API Endpoints

### Health Check
```http
GET /api/health
```
Check database connection status and system health.

### Students
```http
GET    /api/students          # Get all students
POST   /api/students          # Create a new student
GET    /api/students/:id      # Get student by ID
PUT    /api/students/:id      # Update student
DELETE /api/students/:id      # Delete student
```

**Student Schema:**
```typescript
{
  studentId: string,      // Unique student ID
  name: string,           // Full name
  email: string,          // Email address
  phone: string,          // Contact number
  grade: string,          // Academic grade/level
  address: string         // Residential address
}
```

### Teachers
```http
GET    /api/teachers          # Get all teachers
POST   /api/teachers          # Create a new teacher
GET    /api/teachers/:id      # Get teacher by ID
PUT    /api/teachers/:id      # Update teacher
DELETE /api/teachers/:id      # Delete teacher
```

**Teacher Schema:**
```typescript
{
  name: string,           // Full name
  email: string,          // Email address
  phone: string,          // Contact number
  department: string,     // Department/specialization
  subject: string         // Primary subject taught
}
```

### Courses
```http
GET    /api/courses           # Get all courses
POST   /api/courses           # Create a new course
GET    /api/courses/:id       # Get course by ID
PUT    /api/courses/:id       # Update course
DELETE /api/courses/:id       # Delete course
```

**Course Schema:**
```typescript
{
  courseCode: string,     // Unique course code
  name: string,           // Course name
  description: string,    // Course description
  credits: number,        // Credit hours
  teacher: string         // Assigned teacher name
}
```

## 🗄️ Database Collections

The application uses MongoDB with the following collections:

- **students**: Student records with personal and academic information
- **teachers**: Teacher profiles with contact and departmental details
- **courses**: Course information with assignments and schedules

All collections are automatically created when the application starts.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables:
   - `MONGODB_URI`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
4. Deploy!

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Required: MongoDB connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/school-management

# Optional: Next.js configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🌟 Features in Detail

### Student Management
- Add new students with complete profile information
- Edit existing student records
- Delete students from the system
- Search students by name, ID, or email
- View detailed student profiles
- Track student grades and academic progress

### Teacher Management
- Maintain comprehensive teacher profiles
- Organize teachers by department
- Assign subjects to teachers
- Update contact information
- Track teaching assignments

### Course Management
- Create and configure courses
- Assign teachers to courses
- Set course credits and codes
- Manage course descriptions
- Track course schedules

### Dashboard
- Overview of total students, teachers, and courses
- Quick statistics with animated counters
- Recent activities and updates
- Database health status monitoring
- Quick access cards to all sections

## 🎨 Customization

### Color Themes
Modify the color themes in `src/app/globals.css`:

```css
/* Students - Blue Theme */
.students-theme { @apply bg-blue-500/30 border-blue-300; }

/* Teachers - Green Theme */
.teachers-theme { @apply bg-green-500/30 border-green-300; }

/* Courses - Purple Theme */
.courses-theme { @apply bg-purple-500/30 border-purple-300; }
```

### Animations
All animations are defined in `src/app/globals.css`:
- `fade-in`: Entrance animation
- `stagger-children`: Sequential card appearance
- `card-hover`: Hover lift effect
- `pulse`: Infinite opacity animation
- `shimmer`: Loading shimmer effect
- `animated-bg`: Background gradient animation

## 🔒 Security

- Environment variables for sensitive data
- Server-side validation for all inputs
- Secure MongoDB connections with authentication
- HTTPS recommended for production deployments

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify your `MONGODB_URI` in `.env.local`
- Check MongoDB Atlas IP whitelist settings
- Ensure database user has proper permissions

### Build Errors
- Delete `.next` folder and rebuild
- Clear npm cache: `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 📧 Contact

For questions or support, please open an issue on GitHub.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the powerful database
- Tailwind CSS for the utility-first CSS framework
- The open-source community

---

Built with ❤️ using Next.js, React, TypeScript, and MongoDB
