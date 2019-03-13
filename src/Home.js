import React from 'react'
import {Link} from 'react-router-dom'
import Bookshelf from './Bookshelf.js'

export default function Home({books}) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf id="currentlyReading" name="Currently Reading" books={books}/>
          <Bookshelf id="wantToRead" name="Want to Read" books={books}/>
          <Bookshelf id="read" name="Read" books={books}/>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  )
}
