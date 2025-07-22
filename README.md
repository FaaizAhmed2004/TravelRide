# TravelNRide - Complete Travel Management System

A comprehensive travel management platform built with Next.js 15, TypeScript, and modern UI components. TravelNRide provides both customer-facing booking services and a complete admin dashboard for managing travel operations.

## 🌟 Features

### 🎯 Customer Features
- **Flight Booking** - Search and book flights with real-time pricing
- **Hotel Reservations** - Browse and book accommodations
- **Tour Packages** - Explore and purchase travel packages
- **Visa Services** - Apply for visa assistance
- **User Dashboard** - Manage bookings, payments, and profile
- **Reviews & Ratings** - Share travel experiences

### 🔧 Admin Dashboard
- **Comprehensive Management** - Tours, bookings, users, reviews
- **Real-time Analytics** - Dashboard with live statistics
- **Coupon Management** - Create and manage discount codes
- **Special Offers** - Promotional campaigns with analytics
- **Order Processing** - Complete order management system
- **Notification System** - Email and WhatsApp notifications
- **User Management** - Role-based access control

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Authentication**: JWT-based auth system
- **Testing**: Jest + React Testing Library
- **Build Tool**: Next.js built-in bundler

## 📦 Project Structure

```
TravelNRide/
├── Frontend/travelnride/travelapp/
│   ├── src/
│   │   ├── app/                    # Next.js App Router pages
│   │   │   ├── Dashboard/          # Admin dashboard pages
│   │   │   ├── user/              # User dashboard pages
│   │   │   ├── Flights/           # Flight booking page
│   │   │   ├── Hotels/            # Hotel booking page
│   │   │   ├── Packages/          # Tour packages page
│   │   │   └── Visa/              # Visa services page
│   │   ├── components/            # Reusable UI components
│   │   ├── component/             # Feature-specific components
│   │   │   ├── Admin/             # Admin dashboard components
│   │   │   ├── User/              # User dashboard components
│   │   │   ├── Auth/              # Authentication components
│   │   │   └── Public/            # Public-facing components
│   │   ├── contexts/              # React contexts
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── lib/                   # Utilities and configurations
│   │   └── styles/                # Global styles
│   └── __tests__/                 # Test files
└── .kiro/                         # Kiro IDE specifications
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/TravelNRide.git
   cd TravelNRide
   ```

2. **Install dependencies**
   ```bash
   cd Frontend/travelnride/travelapp
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## 🎨 Key Components

### Admin Dashboard
- **Tours Management** - CRUD operations for travel packages
- **Booking Management** - Process and track customer bookings
- **User Management** - Manage customer accounts and roles
- **Analytics Dashboard** - Real-time business metrics
- **Notification Center** - Email/WhatsApp notification system

### Customer Interface
- **Flight Search** - Advanced flight booking with filters
- **Hotel Booking** - Accommodation search and reservation
- **Package Tours** - Pre-designed travel packages
- **User Profile** - Personal dashboard and booking history

## 🔐 Authentication & Authorization

- JWT-based authentication system
- Role-based access control (Admin/User)
- Protected routes for dashboard access
- Session management with automatic refresh

## 📱 Responsive Design

- Mobile-first approach
- Responsive navigation with collapsible sidebars
- Touch-friendly interfaces
- Optimized for all screen sizes

## 🧪 Testing

Comprehensive testing setup with:
- Unit tests for components
- Integration tests for user flows
- API service testing
- Authentication flow testing

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Docker
```bash
# Build Docker image
docker build -t travelnride .

# Run container
docker run -p 3000:3000 travelnride
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For support, email support@travelnride.com or join our Slack channel.

---

**TravelNRide** - Making travel booking simple, secure, and enjoyable! ✈️🏨🌍