# EverEarth - Eco-Friendly E-commerce Platform

## Project Overview
EverEarth is a full-stack e-commerce platform specializing in eco-friendly products. The project consists of three main components:

1. **Frontend (Customer Interface)**
   - Built with React (Create React App)
   - Deployed on Netlify
   - Features:
     - Product browsing by categories
     - New collections showcase
     - Popular products section
     - Shopping cart functionality
     - User authentication
     - Responsive design

2. **Admin Panel**
   - Built with React + Vite
   - Deployed on Netlify
   - Features:
     - Product management (Add/Edit/Delete)
     - Image upload with Cloudinary
     - Product categorization
     - Sales monitoring

3. **Backend API**
   - Built with Node.js and Express
   - Deployed on Render.com
   - Features:
     - RESTful API endpoints
     - MongoDB database integration
     - Cloudinary integration for image storage
     - JWT authentication
     - CORS enabled

## Tech Stack
- **Frontend**: React.js, React Router, Context API
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Image Storage**: Cloudinary
- **Authentication**: JWT
- **Deployment**: Netlify (Frontend & Admin), Render.com (Backend)

## Deployment URLs
- Frontend: https://everearth-eco-shop.netlify.app
- Admin Panel: https://shiny-travesseiro-1f3dff.netlify.app
- Backend API: https://everearth-backend.onrender.com

## Key Features
1. **Product Management**
   - Category-based organization
   - New collections showcase
   - Popular products section
   - Image upload and management

2. **User Features**
   - User authentication
   - Shopping cart functionality
   - Category-based browsing
   - Product search

3. **Admin Features**
   - Product CRUD operations
   - Image upload to Cloudinary
   - Product categorization
   - Inventory management

## Environment Variables
### Backend
```
PORT=4000
MONGO_URI=mongodb+srv://[username]:[password]@[cluster].mongodb.net/[database]
CLOUDINARY_CLOUD_NAME=[cloud_name]
CLOUDINARY_API_KEY=[api_key]
CLOUDINARY_API_SECRET=[api_secret]
```

## Project Structure
```
E-commerce Website/
├── frontend/           # Customer-facing React application
├── Admin/             # Admin panel (Vite + React)
└── backend/           # Node.js + Express API server
```

## API Endpoints
- `/products/:category` - Get products by category
- `/newcollections` - Get latest products
- `/popular` - Get popular products
- `/allproducts` - Get all products
- `/upload` - Upload product images
- `/addproduct` - Add new product
- `/removeproduct` - Remove product

## Future Enhancements
1. Payment gateway integration
2. Order management system
3. User reviews and ratings
4. Advanced search functionality
5. Analytics dashboard
6. Email notifications

## Security Features
- JWT-based authentication
- Secure image upload
- Environment variable protection
- CORS configuration
- MongoDB Atlas security
