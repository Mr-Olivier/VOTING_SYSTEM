# UR-Electify Frontend

A modern, secure electronic voting system for university student elections built with React, TypeScript, and Redux.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## 🚀 Features

- **Secure Authentication**: JWT-based authentication with OTP verification
- **Role-Based Access**: Different interfaces for students and administrators
- **Real-Time Updates**: Live election results and updates
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **State Management**: Centralized Redux store with RTK
- **API Integration**: Axios-based service layer
- **Form Handling**: Robust form validation and error handling

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Programming Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Icons**: Lucide React & React Icons
- **HTTP Client**: Axios
- **Router**: React Router v6
- **UI Components**: Headless UI

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/codeWithEdison/UR-ELECTIFY-FRONTEND.git

# Navigate to project directory
cd ur-electify-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

## 📁 Project Structure

```
ur-electify-frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── features/       # Feature-based modules
│   ├── layouts/        # Page layouts
│   ├── pages/          # Application pages
│   ├── services/       # API services
│   ├── store/          # Redux store
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
```

## 🔧 Configuration

The project uses different environment configurations:

- `.env.development` - Development environment
- `.env.production` - Production environment
- `.env.test` - Testing environment

## 🚀 Available Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint

# Testing
npm run test
```

## 🔒 Environment Variables

```env
VITE_API_URL=http://localhost:3000/api/v1
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Edison UWIHANGANYE - Developer

## 🔗 Links

- [Backend Repository](https://github.com/codeWithEdison/UR-electify-backend.git)
- [API Documentation](https://github.com/codeWithEdison/UR-electify-backend.git)
- [Live Demo](https://ur-electify.com)

## 📋 Todo

- [ ] Implement WebSocket for real-time updates
- [ ] Add comprehensive test coverage
- [ ] Implement CI/CD pipeline
- [ ] Add performance monitoring
- [ ] Enhance accessibility features