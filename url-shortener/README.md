# URL Shortener

A simple web-based URL shortener built with React and custom hooks for managing URL shortening, metrics, and URL management operations.

## Features

- Shorten long URLs with expiration times.
- Display metrics for the most visited and most converted URLs.
- Display user data by countries.
- Manage shortened URLs: fetch the original long URL and delete shortened URLs.
- Clipboard support for copying shortened URLs.
- Error handling for invalid inputs or failed operations.

## Project Structure

### Frontend

- **Components**: 
  - `ConvertBlock`: Handles the input for URL shortening and submission.
  - `ErrorBlock`: Displays errors during URL operations.
  - `ManageUrls`: Allows users to delete or fetch the original long URLs by their shortened version.
  - `Metrics`: Displays URL metrics (visited, converted, etc.).
  - `ShortenedUrlBlock`: Displays the shortened URL and allows copying.
  - `UsersByCountriesMetrics`: Displays metrics about users by their countries.
- **Hooks**: 
  - `useApp`: Manages the URL shortening process, including form submission, loading states, and error handling.
  - `useMetrics`: Fetches and manages metrics such as most visited URLs, most converted URLs, and users by countries.
  - `useManageUrls`: Handles deletion and fetching of URLs.
  
### Backend

- **Endpoints**:
  - POST `/shorten`: Shorten a long URL.
  - GET `/metrics`: Fetch metrics for URLs.
  - DELETE `/delete`: Delete a shortened URL.
  - GET `/original`: Get the original URL from a shortened one.

- **Routes**
  - `url.route.js`: Handles routes for URL creation, redirection, and deletion.
  - `metrics.route.js`: Provides routes for fetching URL metrics.

- **Services**
  - `url.service.js`: Manages URL-related logic, such as shortening, fetching, and deleting URLs.

- **Database**
  - `LocalDB.js`: Manages an in-memory cache for fast URL retrieval.
  - `LocalDeleteDB.js`: Tracks URLs that need to be deleted due to expiration.

- **Models**
  - `Url.model.js`: Defines the MongoDB schema for URLs.

- **Utils**
  - `init-cleanup.js`: Performs cleanup tasks to remove expired URLs from the database.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) 
- [MongoDB](https://www.mongodb.com/) running locally or in the cloud


### Dependencies
### Frontend Dependencies
React: ^18.3.1
@testing-library/jest-dom: ^5.17.0
@testing-library/react: ^13.4.0
@testing-library/user-event: ^13.5.0
web-vitals: ^2.1.4


### Backend Dependencies
Express: ^4.21.0
Body-parser: ^1.20.3
Cors: ^2.8.5
Mongoose: ^8.6.3
Nodemon: ^3.1.7
Redis: ^4.7.0
Shortid: ^2.2.16

### Installation
### Frontend 

Navigate to the frontend directory and install dependencies:

### Commands
cd url-shortener
npm install - or - npm i 
to run the code - type npm start 

### Backend

Navigate to the backend directory and install dependencies:

### Commands
cd backend
npm install - or - npm i 
to run the server - type nodemon server.js

This adds the specific commands for **installing the dependencies** and **running the servers** for both the frontend and backend sections of the project. Let me know if you need any further adjustments!


