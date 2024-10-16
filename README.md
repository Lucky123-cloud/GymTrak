# GymTrak

GymTrak is a comprehensive gym management application designed for both gym members and admins. It allows users to track their workout schedules, receive notifications, and stay updated on gym events and promotions. Admins can manage members, send notifications, update news feeds, and generate reports on gym activities.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup and Installation](#setup-and-installation)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Workout Management](#workout-management)
  - [Notifications](#notifications)
  - [Admin Features](#admin-features)
  - [News Feed](#news-feed)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Future Improvements](#future-improvements)
- [License](#license)

## Features

### Client-Side Features
- **Sign Up & Login**: Allows users to register and log in to their accounts.
- **Workout Tracking**: Users can set their workout schedule, track body parts to focus on, and view details of their workouts (e.g., sets, reps, rest).
- **Notifications**: Members receive various types of notifications:
  - Workout reminders
  - Payment reminders
  - Hydration reminders
- **View News Feed**: Stay updated with events, sales, and promotions at the gym.
- **Subscription Status**: View current subscription status, including type and validity period.

### Admin Features
- **Member Management**: Admins can manage member subscriptions, update schedules, and view their details.
- **Notification System**: Send personalized notifications to members via email or SMS.
- **Manage News Feed**: Add and update events, promotions, and sales in the news feed.
- **Analytics**: View reports and generate insights based on gym activities and member engagement.

## Technologies

### Backend
- **Node.js**: JavaScript runtime environment for building the server-side application.
- **Express.js**: Web framework for creating API endpoints.
- **MongoDB**: NoSQL database for storing users, workouts, notifications, and news feeds.
- **JWT**: JSON Web Token for authentication and authorization.
- **Nodemailer**: For sending email notifications.
- **Twilio**: For sending SMS notifications.

### Frontend
- **HTML/CSS/JavaScript**: Basic frontend for displaying user and admin dashboards.
- **Postman**: API testing and documentation.

## Setup and Installation

### Prerequisites
- **Node.js** (v12 or higher)
- **MongoDB** (either a local MongoDB instance or a cloud MongoDB Atlas account)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/GymTrak.git
