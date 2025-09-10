# Frontend - E-Commerce React App

This is the frontend React application for the e-commerce learning project.

## What is the module?
A modern React.js frontend application for an e-commerce website with features like product catalog, shopping cart, user authentication, and checkout process.

## What does the module do?
- Displays product catalog with filtering capabilities
- Manages shopping cart functionality
- Handles user registration and login
- Provides checkout process with form validation
- Responsive design for mobile and desktop

## Why was the module created?
This module was created as a learning project to develop frontend development skills, specifically:
- Learning React.js fundamentals
- Understanding component-based architecture
- Practicing modern CSS and responsive design
- Learning state management and routing

## How do you install the module?

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation Steps
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Are there any configuration steps required?
- No additional configuration is required for basic functionality
- The app is configured to work with a PHP backend running on `http://localhost:8000`
- To change the backend URL, update the API base URL in the services files

## How do you use the module?

### Available Scripts
- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

### Pages Available
- **Home** (`/`) - Landing page with featured products
- **Products** (`/products`) - Full product catalog with filtering
- **Product Detail** (`/product/:id`) - Individual product page
- **Cart** (`/cart`) - Shopping cart management
- **Checkout** (`/checkout`) - Order completion form
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - User registration

## Does the module expose any API endpoints?
This is a frontend module that consumes APIs from the PHP backend. It makes HTTP requests to:
- `GET /api/products` - Fetch product catalog
- `GET /api/products/:id` - Fetch individual product
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/cart/add` - Add item to cart
- `GET /api/cart` - Fetch cart contents

## What are the dependencies and requirements?

### Core Dependencies
- **React** (^18.2.0) - UI library
- **React Router DOM** (^6.0.0) - Client-side routing
- **Axios** (^1.0.0) - HTTP client for API calls

### Development Dependencies
- **Create React App** - Build tooling and development server
- **React Scripts** - Build and test scripts

### Browser Requirements
- Modern browsers supporting ES6+
- JavaScript enabled

## What are common issues and how can they be fixed?

### Common Issues

1. **Port already in use**
   - Solution: Kill the process using port 3000 or use `PORT=3001 npm start`

2. **Module not found errors**
   - Solution: Run `npm install` to ensure all dependencies are installed

3. **API connection issues**
   - Solution: Ensure the PHP backend is running on the correct port
   - Check CORS settings in the backend

4. **Build failures**
   - Solution: Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## How can others contribute to this module?

### Contribution Guidelines
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test your changes: `npm test`
5. Build the project: `npm run build`
6. Commit your changes: `git commit -m "Add feature"`
7. Push to the branch: `git push origin feature-name`
8. Submit a pull request

### Coding Style
- Follow React best practices
- Use functional components with hooks
- Maintain consistent CSS naming conventions
- Add comments for complex logic
- Write meaningful commit messages

## Who maintains this module and how can they be contacted?
This is a learning project maintained by the development team. For questions or support, please create an issue in the repository.

