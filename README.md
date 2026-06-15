# ViVaT Real Estate Management System

**Інформаційна система моніторингу та розподіленого керування об'єктами нерухомості з інтегрованим модулем автоматизації клієнтської підтримки**

A comprehensive real estate management system with AI-powered customer support for ViVaT Real Estate Agency.

## Features

### Dashboard
- Real-time statistics and KPI cards
- Sales and rental performance charts
- Recent activity feed
- Upcoming meetings widget

### Property Management
- Full CRUD operations for properties
- Property types: apartments, houses, offices, commercial
- Photo gallery with drag-and-drop upload
- Advanced filtering and search
- Status management: available / sold / rented / pending

### CRM Module
- Complete client database
- Client notes and interaction history
- Automatic manager assignment
- Meeting scheduler with calendar view

### AI Support Module
- Intelligent chatbot assistant
- AI-powered property recommendations
- Automatic query analysis
- FAQ system integration

### Distributed Management
- Multi-branch agency support
- Role-based access control (Admin, Manager, Agent, Support)
- User activity logging
- Online status tracking

### Monitoring & Analytics
- User activity monitoring
- Event logging
- View analytics for properties
- Revenue and performance charts

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with dark mode
- **State Management**: Zustand
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth with JWT
- **UI Components**: Custom components with Framer Motion animations
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vivat/real-estate-system.git
cd real-estate-system
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start development server:
```bash
npm run dev
```

### Demo Accounts

Use these credentials to explore the system:

| Role | Email | Password |
|------|-------|----------|
| Administrator | admin@vivat.ua | demo123 |
| Manager | manager@vivat.ua | demo123 |
| Agent | agent@vivat.ua | demo123 |

### Building for Production

```bash
npm run build
```

### Docker Deployment

```bash
docker-compose up --build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── charts/         # Chart components (Line, Bar, Pie)
│   ├── dashboard/      # Dashboard widgets
│   ├── layout/         # Layout components (Sidebar, Header)
│   └── ui/             # Base UI components (Button, Card, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries (Supabase client)
├── pages/              # Page components
├── stores/             # Zustand state stores
└── types/              # TypeScript type definitions
```

## Database Schema

The system uses the following main tables:

- `profiles` - Extended user information
- `branches` - Agency branches
- `properties` - Real estate listings
- `property_images` - Property image gallery
- `clients` - CRM client database
- `client_notes` - Client interaction notes
- `meetings` - Scheduled meetings
- `inquiries` - Support tickets
- `inquiry_messages` - Ticket messages
- `notifications` - User notifications
- `ai_conversations` - AI chat history
- `ai_messages` - AI chat messages
- `activity_logs` - Audit trail
- `favorites` - User favorites
- `property_views` - View analytics

## Security

- Row Level Security (RLS) enabled on all tables
- Role-based access control
- Secure authentication with Supabase Auth
- Input validation and sanitization

## Localization

The system supports:
- Ukrainian (UK)
- English (EN)

Switch languages using the globe icon in the header.

## Theme

Supports both light and dark modes. Toggle using the sun/moon icon in the header.

## License

Proprietary software for ViVaT Real Estate Agency.

## Support

For support, contact: support@vivat.ua

---

Built with modern web technologies for ViVaT Real Estate Agency.
