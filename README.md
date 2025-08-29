# BookNest - Modern Online Bookstore

BookNest is a modern, responsive online bookstore and reading community platform built with Next.js, TypeScript, and Tailwind CSS. It demonstrates a complete e-commerce solution with three distinct user access levels and comprehensive authentication features.

## 🚀 Features

### User Access Levels

#### 📖 **Public Users (No Login Required)**

- Browse the complete book catalog
- View book details, ratings, and reviews
- Search and filter books by genre, price, rating
- View featured books and categories
- Access testimonials and community features

#### 👤 **Regular Users (Authenticated)**

- All public user features, plus:
- Purchase books and manage shopping cart
- Create and manage personal reading lists
- Write and submit book reviews
- Join book clubs and community discussions
- Access order history and tracking
- Personalized book recommendations
- Wishlist functionality

#### 🛡️ **Admin Users (Admin Access)**

- All regular user features, plus:
- Access to comprehensive admin dashboard
- User management (view, edit, suspend users)
- Inventory management (add, edit, remove books)
- Order management and tracking
- Content moderation (review reported content)
- Analytics and reporting tools
- System configuration settings

### Authentication Features

#### 🔐 **Complete Authentication System**

- **User Registration** with email verification
- **Secure Login** with password visibility toggle
- **Multi-Factor Authentication (MFA)** for admin accounts
- **Forgot Password** functionality with email reset
- **Email Verification** for new accounts
- **Demo Accounts** for testing different access levels

#### 🔒 **Security Features**

- Password strength validation
- Account verification via email
- MFA support for enhanced security
- Session management with local storage
- Role-based access control

## 🎨 UI/UX Features

### Modern Design

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI Components** - Clean, professional interface
- **Smooth Animations** - Hover effects and transitions
- **Accessibility** - Screen reader friendly and keyboard navigation
- **Dark/Light Theme Ready** - Structured for theme switching

### User Experience

- **Intuitive Navigation** - Easy-to-use menu and breadcrumbs
- **Advanced Search** - Filter by genre, price, rating, availability
- **Grid and List Views** - Multiple viewing options for book catalog
- **Shopping Cart** - Persistent cart with item management
- **Wishlist** - Save books for later
- **Reading Progress** - Track reading lists and history

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for consistent iconography
- **State Management**: React Context API
- **Authentication**: Custom auth context (ready for AWS Cognito integration)

## 📱 Pages and Components

### Public Pages

- **Homepage** - Hero section, featured books, categories, testimonials
- **Books Catalog** - Complete book listing with search and filters
- **Book Details** - Individual book information and reviews
- **Categories** - Browse books by genre

### Authentication Pages

- **Login** - Secure user authentication with MFA support
- **Register** - New user registration with email verification
- **Forgot Password** - Password reset functionality

### User Pages

- **Profile** - User account management
- **Orders** - Order history and tracking
- **Reading List** - Personal book collections
- **Wishlist** - Saved books for later

### Admin Pages

- **Dashboard** - Analytics and overview
- **User Management** - Manage user accounts
- **Inventory** - Book catalog management
- **Orders** - Order processing and management
- **Content Moderation** - Review and moderate user content

## 🎯 Demo Accounts

### Admin Account (Full Access + MFA)

- **Email**: admin@booknest.com
- **Password**: admin123
- **MFA Code**: 123456 (demo)

### Regular User Account

- **Email**: reader@booknest.com
- **Password**: reader123

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd booknest
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔮 AWS Cognito Integration Ready

The application is structured to easily integrate with AWS Cognito:

- **Authentication Context** - Ready for Cognito SDK integration
- **User Role Management** - Supports Cognito user groups
- **MFA Support** - Built-in MFA verification flow
- **Email Verification** - Ready for Cognito email verification
- **Password Reset** - Structured for Cognito password reset flow

### Integration Points

- Replace mock authentication in `AuthContext.tsx`
- Configure Cognito user pools and identity pools
- Update authentication flows to use Cognito SDK
- Configure user groups for role-based access

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin dashboard
│   ├── books/             # Book catalog
│   ├── login/             # Authentication
│   ├── register/          # User registration
│   └── forgot-password/   # Password reset
├── components/
│   ├── home/              # Homepage components
│   └── layout/            # Navigation and layout
└── contexts/
    └── AuthContext.tsx    # Authentication state management
```

## 🎨 Design System

### Color Palette

- **Primary**: Blue shades for main actions and branding
- **Secondary**: Gray shades for text and backgrounds
- **Success**: Green for positive actions
- **Warning**: Yellow for cautions
- **Error**: Red for errors and destructive actions

### Typography

- **Font**: Inter for clean, modern typography
- **Headings**: Bold weights for hierarchy
- **Body**: Regular weights for readability

### Components

- **Buttons**: Consistent styling with hover states
- **Forms**: Clean input fields with validation
- **Cards**: Elevated surfaces for content grouping
- **Navigation**: Intuitive menu structure

## 🤝 Contributing

This project is designed for educational purposes and AWS Cognito integration demonstration. Feel free to:

1. Fork the repository
2. Create feature branches
3. Submit pull requests
4. Report issues and suggestions

## 📄 License

This project is created for educational purposes. Feel free to use and modify as needed.

## 🔗 Future Enhancements

- AWS Cognito integration
- Payment processing
- Real-time chat for book clubs
- Advanced recommendation engine
- Mobile app companion
- Social sharing features
- Book preview functionality
