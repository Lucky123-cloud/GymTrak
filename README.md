GymTrak
GymTrak is a comprehensive gym management application designed for both gym members and admins. It allows users to track their workout schedules, receive notifications, and stay updated on gym events and promotions. Admins can manage members, send notifications, update news feeds, and generate reports on gym activities.

Table of Contents
Features
Technologies
Setup and Installation
API Documentation
Authentication
Workout Management
Notifications
Admin Features
News Feed
Database Schema
Testing
Future Improvements
License
Features
Client-Side Features
Sign Up & Login: Allows users to register and log in to their accounts.
Workout Tracking: Users can set their workout schedule, track body parts to focus on, and view details of their workouts (e.g., sets, reps, rest).
Notifications: Members receive various types of notifications:
Workout reminders
Payment reminders
Hydration reminders
View News Feed: Stay updated with events, sales, and promotions at the gym.
Subscription Status: View current subscription status, including type and validity period.
Admin Features
Member Management: Admins can manage member subscriptions, update schedules, and view their details.
Notification System: Send personalized notifications to members via email or SMS.
Manage News Feed: Add and update events, promotions, and sales in the news feed.
Analytics: View reports and generate insights based on gym activities and member engagement.
Technologies
Backend
Node.js: JavaScript runtime environment for building the server-side application.
Express.js: Web framework for creating API endpoints.
MongoDB: NoSQL database for storing users, workouts, notifications, and news feeds.
JWT: JSON Web Token for authentication and authorization.
Nodemailer: For sending email notifications.
Twilio: For sending SMS notifications.
Frontend
HTML/CSS/JavaScript: Basic frontend for displaying user and admin dashboards.
Postman: API testing and documentation.
Setup and Installation
Prerequisites
Node.js (v12 or higher)
MongoDB (either a local MongoDB instance or a cloud MongoDB Atlas account)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/GymTrak.git
Navigate to the project directory:

bash
Copy code
cd GymTrak
Install the required dependencies:

bash
Copy code
npm install
Create a .env file in the root directory and add the following:

env
Copy code
MONGO_URI=your_mongo_database_uri
JWT_SECRET=your_jwt_secret
EMAIL_HOST=smtp.your-email-provider.com
EMAIL_PORT=your-email-port
EMAIL_USER=your-email-address
EMAIL_PASS=your-email-password
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
Start the server:

bash
Copy code
npm start
The server should now be running on http://localhost:5000.

API Documentation
Authentication
1. Register a new user
POST /api/auth/register
Body Parameters:
name: User's name (string, required)
email: User's email (string, required)
password: User's password (string, required, minimum 6 characters)
Response:
A JWT token for the authenticated user.
2. Login a user
POST /api/auth/login
Body Parameters:
email: User's email (string, required)
password: User's password (string, required)
Response:
A JWT token for the authenticated user.
Workout Management
1. Create a workout
POST /api/workouts
Body Parameters:
dayOfWeek: The day of the workout (enum, required)
bodyPart: Body part to focus on (enum, required)
exercises: Array of exercises (name, sets, reps, rest)
Response:
Workout details with a unique workout ID.
2. Update a workout
PUT /api/workouts/:workoutId
Body Parameters:
exercises: Updated array of exercises.
Response:
The updated workout details.
3. Delete a workout
DELETE /api/workouts/:workoutId
Response:
Confirmation message.
Notifications
1. Send Notification (Admin Only)
POST /api/admin/clients/:clientId/notify
Body Parameters:
message: Notification message (string, required)
type: Type of notification (enum: workout, payment, hydration)
Response:
Confirmation message.
Admin Features
1. Manage Members
PUT /api/admin/clients/:clientId/subscription
Body Parameters:
subscriptionType: Subscription type (monthly, weekly, daily)
status: Subscription status (active, inactive)
2. Send Notifications
POST /api/admin/clients/:clientId/notify
News Feed
1. Get News Feed
GET /api/newsfeed
2. Add News (Admin Only)
POST /api/admin/newsfeed
Body Parameters:
title: Title of the event or promotion (string, required)
description: Description (string, required)
Response:
Confirmation message.
Database Schema
Users Collection
json
Copy code
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "enum(client/admin)",
  "subscription_type": "enum(monthly/weekly/daily)",
  "subscription_status": "enum(active/inactive)"
}
Workouts Collection
json
Copy code
{
  "_id": "ObjectId",
  "user_id": "ObjectId",
  "dayOfWeek": "enum",
  "bodyPart": "enum",
  "exercises": [
    {
      "name": "string",
      "sets": "number",
      "reps": "string",
      "rest": "string"
    }
  ]
}
Notifications Collection
json
Copy code
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "type": "enum(workout/payment/hydration)",
  "message": "string"
}
Testing
You can test all the API endpoints using Postman or write automated tests using Jest and Supertest.

To run tests:

bash
Copy code
npm test
Future Improvements
UI/UX Enhancements: Add a modern, responsive UI using frameworks like React.js or Vue.js.
Mobile App: Create a mobile version using React Native or Flutter for an enhanced user experience.
Analytics Dashboard: Provide more detailed insights for gym admins regarding member engagement, workout trends, and subscription renewals.
License
This project is licensed under the MIT License.