1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd school-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Seed the database with sample data**
   ```bash
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
