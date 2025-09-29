# Titan React Test

A modern React movie browser application built for Titan OS, featuring keyboard navigation, movie selection, and dynamic content loading from the Titan OS API.

## 🎯 Features

- **Movie Browser**: Browse movies from the Titan OS content API
- **Keyboard Navigation**: Use left/right arrow keys to navigate through movies
- **Responsive Design**: Styled with styled-components for consistent UI
- **Error Handling**: Graceful error states and loading indicators
- **State Management**: Zustand store for managing selected movie state
- **Type Safety**: Full TypeScript implementation with strict typing

## 🏗️ Architecture

The application follows atomic design principles with a well-structured component hierarchy:

```
src/
├── components/
│   ├── atoms/          # Basic building blocks
│   ├── molecules/      # Simple component combinations
│   ├── organisms/      # Complex components (MovieList)
│   ├── pages/          # Page-level components
│   └── templates/      # Page layouts
├── hooks/              # Custom React hooks (useData)
├── store/              # Zustand state management
├── types/              # TypeScript type definitions
├── assets/             # Static assets
└── mockData/           # Test data
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production (TypeScript + Vite)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality
- `npm test` - Run unit tests with Vitest
- `npm run test:coverage` - Generate test coverage reports
- `npm run test:e2e` - Run end-to-end tests with Playwright
- `npm run test:e2e:headed` - Run E2E tests in headed mode
- `npm run storybook` - Start Storybook component documentation
- `npm run build-storybook` - Build Storybook for production

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests**: Vitest with React Testing Library
- **Component Tests**: Storybook with addon-vitest integration
- **E2E Tests**: Playwright for browser automation
- **Coverage Reports**: Available in `/coverage` directory
- **Accessibility Testing**: Storybook a11y addon

Run tests:
```bash
npm test                    # Unit tests
npm run test:coverage       # Coverage report
npm run test:e2e           # E2E tests
npm run storybook          # Component stories
```

## 🔧 Tech Stack

### Core
- **React 19** - UI framework with latest features
- **TypeScript 5.8** - Type-safe development
- **Vite 7** - Fast build tool and development server

### Styling & UI
- **Styled Components 6** - CSS-in-JS styling solution

### State Management
- **Zustand 5** - Lightweight state management

### Testing
- **Vitest 3** - Fast unit testing framework
- **Playwright** - E2E testing framework
- **Testing Library** - React component testing utilities
- **Storybook 9** - Component development and documentation

### Code Quality
- **ESLint 9** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

## 📱 Usage

1. **Navigation**: Use left/right arrow keys to browse through movies
2. **Selection**: Click on a movie or press Enter to select it
3. **Synopsis**: Selected movie synopsis appears at the bottom
4. **Loading**: The app shows loading state while fetching data
5. **Error Handling**: Network errors are displayed with helpful messages

## 🗂️ Key Components

- **App**: Main application component with movie store integration
- **MovieList**: Keyboard-navigable movie carousel with selection
- **useData**: Custom hook for API data fetching with error handling
- **movieStore**: Zustand store for selected movie state management

## 🌐 API Integration

The app fetches movie data from:
```
https://acc01.titanos.tv/v1/genres/1/contents?market=es&device=tv&locale=es&page=1&per_page=50&type=movie
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



## Selected question
How would you optimize the frontend for smooth performance when displaying thousands of content tiles with images and metadata? Discuss your approach to lazy loading, caching, and memory management for resource-constrained CTV devices.

### Answer
Here a list of actions:

1. Lazy loading: using the loading='lazy' in the img tag, the loading of the image is deferred until is closed to the viewport. This allows to load only the images to be shown initially and the rest only when they are needed

2. Resource prioritization: using the Priority Hints API you can priorize some assets and delay others, warranting a fast initial loading of what you need to show asap.

3. Images size: the current size of the images provided for this exercise is 2000x3000px, which it seems excesive for this case. It could be useful for showing the image once you enter into the movie screen but not to the list. Providing different versions of each image to fit the different needs is a good practice.

4. CDN: using CDNs for storing the external assets, like images allow us to load the image from different locations and with mamimum speed.

5. Reduced dataset: the dataset loaded with the provided URL has a lot of unnecessary information. Using a technology like GraphQL you could provide in the request the schema of the needed data you need at any moment, reducing the size of data to get and therefore incrementing the download speed.

6. Virtualization: using libraries like react-window, you can manage big lists or grids without the common performance problems you could find when rendering lots of data. This library manage to render only the visible part of the list or grid you have on screen.

7. Caching: using service workers you can cache assets to do not request them again. This also allows the app to work offline or under poor network connections.

8. Performance profiling: using tools like Lighthouse or the Network throwing in the Chrome Devtools, you can test the app under different connections, identifying better the possible bottlenecks and areas for improvement.

