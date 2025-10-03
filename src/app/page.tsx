"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-6 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
          📚 School Management App
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          A centralized platform to manage <span className="font-semibold">students</span>,{" "}
          <span className="font-semibold">teachers</span>, and{" "}
          <span className="font-semibold">courses</span> with ease.
        </p>
      </header>

      {/* Navigation Cards */}
      <main className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
        <NavCard
          title="👩‍🎓 Students"
          description="Register, update, and manage student records"
          href="/students"
        />
        <NavCard
          title="👨‍🏫 Teachers"
          description="Add and edit teacher profiles, assign courses"
          href="/teachers"
        />
        <NavCard
          title="📘 Courses"
          description="Create and manage courses, link students & teachers"
          href="/courses"
        />
        <NavCard
          title="🛠️ API Health"
          description="Check if MongoDB connection is working"
          href="/api/health"
          external
        />
      </main>

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-500 dark:text-gray-400">
        Built with <span className="font-medium">Next.js</span> &{" "}
        <span className="font-medium">MongoDB</span>.
      </footer>
    </div>
  );
}

function NavCard({
  title,
  description,
  href,
  external = false,
}: {
  title: string;
  description: string;
  href: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : "_self"}
      className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
    >
      <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </Link>
  );
}
