# MyReads

A React bookshelf application that allows you to organize books into three shelves: Currently Reading, Want to Read, and Read. Built with React and Vite.

## Features

- **Three Bookshelves**: Organize your books into Currently Reading, Want to Read, and Read
- **Book Search**: Search for new books to add to your library
- **Shelf Management**: Move books between shelves or remove them
- **State Persistence**: Book shelf assignments sync between search and main pages

## Installation

1. Clone or download the repository
2. Navigate to the project directory:
   ```bash
   cd starter
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Launch Instructions

### Development Server

Start the development server:
```bash
npm run dev
```

The app will open in your browser at `http://localhost:3000`.

To expose to your network (access from other devices):
```bash
npm run dev -- --host
```

### Production Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Usage

- The main page displays your bookshelf with three categories
- Click the "+" button (Add a book) to search for new books
- Use the dropdown on any book cover to move it between shelves
- Books added from search automatically sync to your library

## API

The app uses a mock backend API with the following methods:

- `getAll()` - Fetches all books in your library
- `update(book, shelf)` - Moves a book to a different shelf
- `search(query)` - Searches for books by title, author, or ISBN

## Project Structure

```
starter/
├── index.html          # Vite entry point
├── vite.config.js      # Vite configuration
├── package.json        # Dependencies and scripts
├── src/
│   ├── App.jsx         # Main app with routing
│   ├── ListBooks.jsx   # Main page with bookshelves
│   ├── SearchPage.jsx  # Search page
│   ├── Bookshelf.jsx   # Individual bookshelf component
│   ├── BooksAPI.jsx    # API helper functions
│   ├── App.css         # Styles
│   └── icons/          # UI icons
└── ...
```

## Technologies

- React 17
- React Router 5
- Vite 7.x
- Udacity Books API

## Future Features / TODO

- **Drag and Drop**: Add drag-and-drop functionality to move books between shelves
- **User Accounts**: Add sign-up and log-in functionality to allow users to save their bookshelves to their accounts
- **Persistent Storage**: Backend integration for user-specific book data

## Original Project

This project is based on the Udacity React Nanodegree MyReads project, migrated from Create React App to Vite for improved build performance and Node.js compatibility.
