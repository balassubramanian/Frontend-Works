# To-Do App

This project is a simple To-Do application built with a backend using Node.js, Express, and MongoDB, and a frontend using Angular. The app allows users to create, view, and delete to-do items.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [MongoDB](https://www.mongodb.com/) (Ensure MongoDB is running on your system)
- [Angular CLI](https://angular.io/cli) (v12.x or later)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/balassubramanian/todo-app.git
cd todo-app
```
### 2. Setup the Backend
#### 2.1 Navigate to the Backend Directory
```bash
cd Back\ End/
```
#### 2.2 Install Dependencies
```bash
npm install
```
#### 2.3 Configure MongoDB Connection
Ensure MongoDB is running before starting the backend server.

#### 2.4 Configure Server Port (Optional)
The backend server runs on port 8080 by default. If you need to change the port, you can do so by modifying the PORT variable in Back End/server.js:

```javascript
Copy code
const PORT = process.env.PORT || 8080;
Change 8080 to any other port number that suits your setup.
```
#### 2.5 Start the Backend Server
```bash
node server.js
```
The server should now be running at http://localhost:8080.

### 3. Setup the Frontend
#### 3.1 Navigate to the Frontend Directory
```bash
Copy code
cd frontend
```
#### 3.2 Install Dependencies
```bash
npm install
```
#### 3.3 Update API Endpoint
The frontend expects the backend to be running at http://localhost:8080. If you have changed the backend port, update the API endpoints in the frontend accordingly.

Open Front End/src/app/app.component.ts.

Update the http.get and http.post URLs to match your backend server's port.
Replace 8080 with your backend port number.

#### 3.4 Start the Frontend Development Server
```bash
ng serve
```
The frontend should now be running at http://localhost:4200.

### 4. Using the Application
Add a To-Do Item: Enter a title and description, then click the "Add" button to save a new to-do item.
Fetch All To-Do Items: The list of all to-do items will be displayed on the main page.
Delete a To-Do Item: Enter the title of the to-do item to be deleted and click "Delete."
