# Build With Saransh

A modern portfolio website showcasing mobile development and design work. Built with Next.js, Django, and Tailwind CSS.

## 🚀 Features

- Responsive design optimized for all devices
- Dynamic project showcase with detailed case studies
- Blog section for sharing insights
- Smooth animations and transitions using Framer Motion
- Dark mode support
- Contact form integration
- SEO optimized

## 🛠️ Tech Stack

### Frontend
- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- Django
- Django REST Framework
- SQLite (Development)
- Media file handling

## 🏗️ Project Structure

```
build-with-saransh/
├── frontend/           # Next.js frontend
│   ├── src/
│   │   ├── app/       # Pages and layouts
│   │   ├── components/# Reusable components
│   │   ├── lib/       # Utilities and API config
│   │   └── styles/    # Global styles
│   └── public/        # Static assets
│
└── backend/           # Django backend
    ├── blog/          # Blog app
    ├── portfolio/     # Portfolio app
    ├── inquiries/     # Contact form handling
    └── core/          # Project settings
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.8 or higher)
- pip
- virtualenv (recommended)

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

6. Run the development server:
   ```bash
   python manage.py runserver
   ```

## 🌐 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Backend (.env)
```env
DEBUG=True
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## 📝 API Endpoints

### Projects
- `GET /api/projects/` - List all projects
- `GET /api/projects/{slug}/` - Get project details

### Blog
- `GET /api/blogposts/` - List all blog posts
- `GET /api/blogposts/{slug}/` - Get blog post details

### Contact
- `POST /api/inquiries/` - Submit contact form

## 🔐 Authentication

Admin interface is available at `/admin` for managing content.

## 🚀 Deployment

Instructions for deploying to production will be added soon.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Saransh Nirmalkar**
- Portfolio: [buildwithsaransh.com](https://buildwithsaransh.com)
- LinkedIn: [Saransh Nirmalkar](https://linkedin.com/in/your-profile)
- GitHub: [@your-username](https://github.com/your-username)
