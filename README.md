# 📚 School Management System

A simple, open-source School Management System built with Next.js (App Router), React, TypeScript, and MongoDB. It provides CRUD operations for students, teachers, and courses and includes basic API routes and pages styled with Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

---

## Quick overview

- Frontend & backend: Next.js (App Router) with React and TypeScript
- Database: MongoDB (Atlas or local)
- Styling: Tailwind CSS
- Purpose: Manage students, teachers and courses with basic CRUD APIs and pages

## Features

- Students: create, read, update, delete
- Teachers: create, read, update, delete
- Courses: create, read, update, delete
- Simple dashboard and pages for each resource
- API routes under `src/app/api/*`

## Tech stack

- Next.js (App Router)
- React
- TypeScript
- MongoDB (native driver)
- Tailwind CSS

## Project structure (important files)

```text
src/
  app/
    api/             # API routes (students, teachers, courses, health)
    courses/         # Courses pages and components
    students/        # Students pages and components
    teachers/        # Teachers pages and components
    layout.tsx
    page.tsx
    globals.css
  components/        # Shared UI components
  lib/               # mongodb.ts, schemas.ts, utils.ts
public/              # Static assets
```

## Installation & local setup


1. Clone the repository

```powershell
git clone https://github.com/Chhialy/School-Management-System.git
cd "School-Management-System"
```

1. Install dependencies

```powershell
npm install
```

1. Create a `.env.local` file in the project root and add your MongoDB connection string

```text
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database-name>
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-a-secret
```

For local development with a local MongoDB instance you can use:

```text
MONGODB_URI=mongodb://localhost:27017/school-management
```

1. Run the app

```powershell
npm run dev
```

Open the app at [http://localhost:3000](http://localhost:3000).

## API endpoints

- Health: `GET /api/health`

Students (examples):

- `GET /api/students` — list students
- `POST /api/students` — create student
- `GET /api/students/:id` — get student
- `PUT /api/students/:id` — update student
- `DELETE /api/students/:id` — delete student

Teachers and Courses follow the same pattern under `/api/teachers` and `/api/courses`.

Example student object shape:

```json
{
  "studentId": "S-001",
  "name": "Alice Example",
  "email": "alice@example.com",
  "phone": "123-456-7890",
  "grade": "10",
  "address": "123 Main St"
}
```

## Scripts

- `npm run dev` — start development server
- `npm run build` — production build
- `npm start` — start production server
- `npm run lint` — run ESLint

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository
1. Create a branch: `git checkout -b feature/your-feature`
1. Commit your changes
1. Push and open a PR

## Troubleshooting

- If MongoDB connection fails, double-check `MONGODB_URI` and Atlas IP access list
- If build errors occur, remove the `.next` folder and reinstall dependencies

## License

This project is licensed under the MIT License. See the `LICENSE` file if present.

---



## 📧 Contact

For questions or support, please open an issue on GitHub.

## 🙏 Acknowledgments

- The team:
    Shann Neil O. Estabillo,
    Vireak La,
    Chhialy Klo,
- Next.js team for the amazing framework
- MongoDB for the powerful database
- Tailwind CSS for the utility-first CSS framework
- The open-source community

---

Built with ❤️ using Next.js, React, TypeScript, and MongoDB
