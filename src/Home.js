import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf.js';
import PropTypes from 'prop-types';

export default function Home({books, onBookshelfChange}) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf books={books} onBookshelfChange={onBookshelfChange}/>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
}

Home.propTypes = {
  books: PropTypes.object.isRequired,
  onBookshelfChange: PropTypes.func.isRequired
};
