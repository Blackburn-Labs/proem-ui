# Proem UI Framework

A modern React application boilerplate built with the latest technologies and best practices. This boilerplate is designed for rapid development of Progressive Web Applications (PWA) with Parse Server as the backend.

## Technology Stack

- **[React 19.1.1](https://react.dev/)** - Modern UI framework with latest features
- **[Material-UI (MUI) v7](https://mui.com/)** - Comprehensive component library
- **[React Router v7](https://reactrouter.com/)** - Client-side routing
- **[Redux](https://redux.js.org/)** - Centralized state management
- **[Vite](https://vite.dev/)** - Next-generation build tool and dev server
- **[Vitest](https://vitest.dev/)** - Modern testing framework
- **[Parse Platform](https://parseplatform.org/)** - Backend-as-a-Service (can be adapted to other backends)

## Prerequisites

Before getting started, ensure you have the following installed:
- **[Git](https://git-scm.com/)** - Version control system
- **[Node.js](https://nodejs.org)** >= 22.13.0 - Runtime environment and NPM package manager

## Quick Start

### 1. Clone and Install

```bash
# Clone this repository
$ git clone https://github.com/Blackburn-Labs/proem-ui.git  your-project-name

# Navigate into the directory
cd your-project-name

# Install dependencies
npm install

# Note: Playwright browsers (~200MB) will be downloaded automatically during installation
# This only happens once and enables E2E testing out of the box
```

### 2. Configure Environment

Create a `.env` file in the root directory (see `.env.example` for template):
```env
API_URL=your_api_url
```

### 3. Start Development Server

```bash
npm start
```

Your application will be available at `http://localhost:5173`

### 4. Disconnect from Boilerplate Repository

After cloning, you'll want to disconnect from the original boilerplate repository and set up your own:

```bash
# Remove the original remote
git remote remove origin

# Initialize fresh git history (optional)
rm -rf .git
git init
git add .
git commit -m "Initial commit from Proem UI boilerplate"

# Add your own repository
git remote add origin your-repo-url
git push -u origin master
```

**Alternative: Download ZIP**
You can also simply download the boilerplate as a ZIP file from `https://github.com/Blackburn-Labs/proem-ui` using the "Download ZIP" button. This gives you a clean start without any git connection.

## Development Commands

```bash
# Start development server
npm start

# Build for production
npm build

# Preview production build
npm preview

# Run unit tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with UI
npm test:ui

# Run tests with coverage
npm test:coverage

# Run E2E tests (browsers installed automatically via postinstall)
npm run test:e2e

# Run E2E tests in UI mode
npm run test:e2e:ui

# Lint and fix code
npm run lint
```

## Project Structure

```
/
├── /public/                # Static assets (icons, images, manifest)
├── /src/
│   ├── /components/        # Reusable app-wide UI components
│   │   ├── /layout/        # Layout components (AppBar, Footer, etc.)
│   │   └── /common/        # Common UI components (Button, Card, etc.)
│   ├── /domain/            # Domain models extending BasicDomain/BasicArray
│   │   └── README.md       # Domain architecture documentation
│   ├── /features/          # Feature-specific components
│   │   └── /profile/       # Example: Profile feature components
│   │       ├── ProfileDetails.jsx
│   │       ├── ProfileList.jsx
│   │       └── ProfileCard.jsx
│   ├── /router/            # Routing configuration
│   ├── /screens/           # Full page components/views
│   │   ├── HomeScreen.jsx
│   │   └── AboutScreen.jsx
│   ├── /store/             # Redux reducers, actions, and selectors
│   │   └── README.md       # Redux patterns documentation
│   ├── /theme/             # Global styles and theme configuration
│   ├── /utils/             # Utility functions and helpers
│   ├── App.jsx             # Root application component
│   └── main.jsx            # Application entry point
├── /tests/                 # Test files
│   ├── /e2e/               # End-to-end tests
│   ├── setup.js            # Test setup and configuration
│   └── README.md           # Testing strategy guide
├── .env.example            # Environment variables template
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite configuration
```

### Directory Conventions

#### `/src/screens/` - Page-Level Components
Contains full-page views that represent the main states/routes of your application. Each screen typically corresponds to a route in your router configuration.

**Example:** `HomeScreen.jsx`, `DashboardScreen.jsx`, `AboutScreen.jsx`

#### `/src/features/` - Feature-Specific Components
Contains all UI components related to a specific feature or domain. Each feature gets its own subdirectory with all related components.

**Example:**
```
/src/features/profile/
├── ProfileDetails.jsx    # Detailed profile view
├── ProfileList.jsx       # List of profiles
├── ProfileCard.jsx       # Individual profile card
└── ProfileForm.jsx       # Profile editing form
```

#### `/src/components/` - Reusable UI Components
Contains generic, reusable components used across multiple features and screens. These should be highly composable and not tied to specific business logic.

**Example:** Navigation bars, buttons, modals, cards, forms, etc.

## Architecture

### Key Architectural Patterns

1. **Domain Models** - All data models extend `BasicDomain` (Parse.Object) or `BasicArray`
   - See [Domain Documentation](src/domain/README.md)

2. **Redux Store** - Centralized state management with strict patterns
   - See [Store Documentation](src/store/README.md)

3. **Testing Strategy** - Focused on business logic, not implementation details
   - See [Testing Documentation](tests/README.md)

### Parse Platform Integration

This boilerplate is designed to work with [Parse Server](https://parseplatform.org/), a powerful open-source backend. All Parse-specific code is marked with `[PARSE]` comments for easy identification and removal if you want to use a different backend.

**Key Parse Integration Points:**
- Domain models extend `Parse.Object` (see `src/domain/BasicDomain.js`)
- Redux actions use `Parse.Query` for data fetching
- Authentication via Parse User system

To adapt this boilerplate for a different backend:
1. Search for `[PARSE]` comments throughout the codebase
2. Replace Parse.Query calls with your API client
3. Update domain models to use your data layer
4. Modify authentication flow in store/auth.js

## Customizing Your Application

After cloning this boilerplate, follow these steps to make it your own:

### 1. Update Project Identity
Do a project-wide search and replace:
- `{{App Name}}` → Your application name
- `{{domain}}` → Your domain/organization

**Files to update:**
- `package.json` - Update name and repository
- `index.html` - Update title and meta tags
- `public/manifest.json` - Update PWA manifest

### 2. Configure Theme
Customize your application's look and feel:
- Edit `src/theme/theme.js` to match your brand colors and style

### 3. Generate Icons and Favicon
- Replace icons in `/public/` directory
- Update `public/manifest.json` with new icon paths
- We recommend using [RealFaviconGenerator](https://realfavicongenerator.net/) for comprehensive favicon generation

### 4. Update Branding Assets
- Replace `/public/logo-light.png` and `/public/logo-dark.png`
- Update logo references in components (e.g., `src/components/layout/AppBar.jsx`)

### 5. Update This README
- Replace this boilerplate `./README.md` with documentation specific to your project
- Include your project's purpose, features, and any custom setup instructions
- Update the technology stack section if you've added or removed dependencies
- Document any project-specific development workflows or conventions

## Testing

This boilerplate follows a pragmatic testing philosophy that prioritizes developer velocity and actual bug prevention. See [tests/README.md](tests/README.md) for detailed testing guidelines.

**Testing Pyramid:**
- ✅ **Unit Tests** - Test pure functions and utilities
- ✅ **Integration Tests** - Test Redux reducers, selectors, and domain models
- ✅ **E2E Tests** - Test critical user journeys (3-5 tests)
- ❌ **UI Component Tests** - We don't write these (see testing guide for why)

## PWA Support

This application is configured as a Progressive Web App (PWA):
- Install and run offline
- App-like experience on mobile devices
- Automatic updates
- Fast loading with service workers

To customize PWA settings:
- Edit `public/manifest.json`
- Update icons in `/public/`
- Configure service worker in `vite.config.js`

## Best Practices

### Code Style
- Use ESLint for code quality (run `npm run lint`)
- Follow React 19 best practices
- Use functional components with hooks
- Implement proper error boundaries

### State Management
- Use Redux for global state
- Use local state for UI-only state
- Follow Redux patterns in [store/README.md](src/store/README.md)

### Component Organization
- Keep components small and focused
- Use composition over inheritance
- Separate business logic from presentation
- Co-locate feature-specific components

## Troubleshooting

### Common Issues

**Build Errors:**
- Ensure Node.js version >= 22.18.0
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

**Environment Variables Not Loading:**
- Ensure `.env` file exists in project root
- All Vite environment variables must start with `VITE_`
- Restart dev server after changing `.env`

**Tests Failing:**
- Run `npm run lint` to check for code issues
- Ensure all dependencies are installed
- Check test setup in `tests/setup.js`

**E2E Tests Not Working:**
- Playwright browsers are installed automatically via `postinstall` script
- If browsers are missing, run `npx playwright install` manually
- Browsers are cached in `~/.cache/ms-playwright` (macOS/Linux) or `%USERPROFILE%\AppData\Local\ms-playwright` (Windows)

## Security Notes

This boilerplate currently uses Parse SDK `^6.2.0-alpha.3` instead of the latest stable version (6.1.1) to avoid [CVE-2025-57324](https://github.com/advisories/GHSA-9g8m-v378-pcg3), a prototype pollution vulnerability affecting all versions ≤ 6.1.1.

The caret (`^`) version range ensures automatic upgrade to stable `6.2.0` when it's released by the Parse team.

**Monitoring**: Check [Parse-SDK-JS releases](https://github.com/parse-community/Parse-SDK-JS/releases) for updates.

## Resources

### Learning Resources

**React & Modern JavaScript:**
- [React Documentation](https://react.dev/)
- [JavaScript.info](https://javascript.info/)

**Redux:**
- [Redux Tutorial by LearnCode.academy](https://youtu.be/1w-oQ-i1XB8?list=PLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b)

**Material-UI:**
- [MUI Documentation](https://mui.com/)
- [MUI Component Examples](https://mui.com/material-ui/getting-started/)

**Parse Platform:**
- [Parse Platform Documentation](https://docs.parseplatform.org/)
- [Parse JavaScript SDK Guide](https://docs.parseplatform.org/js/guide/)

**Testing:**
- [Vitest Documentation](https://vitest.dev/)
- [Playwright E2E Testing](https://playwright.dev/)

## Contributing

When contributing to this project:
1. Follow the testing guidelines in [tests/README.md](tests/README.md)
2. Run `npm run lint` before committing
3. Write tests for business logic, not UI components
4. Keep commits focused and well-documented

## License

This project is open source and available under the MIT License.

---

**Ready to build something amazing?** Start by running `npm start` and begin customizing this boilerplate for your next project!
