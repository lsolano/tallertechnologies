# Tasks Management Frontend

A React TypeScript application for managing tasks through the Tasks API.

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- The Tasks API backend running on `http://localhost:5242/tasks`

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── components/
│   ├── TaskForm.tsx      # Form for creating new tasks
│   └── TaskTable.tsx     # Table for displaying tasks
├── services/
│   └── taskApi.ts        # API service for backend communication
├── types/
│   └── Task.ts           # TypeScript interfaces
├── App.tsx               # Main application component
├── App.css               # Application styles
└── index.tsx             # Application entry point
```


## Technologies Used

- React 18
- TypeScript

