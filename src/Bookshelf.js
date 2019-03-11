import React from 'react'
import Book from './Book.js'

function booksByShelf(books, shelfId) {
    return books.filter((book) => book.shelf === shelfId)
}

export default function Bookshelf(props) {
    const { id, name, books } = props

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {booksByShelf(books, id).map((book) => (
                        <li key={book.title}>
                            <Book book={book}/>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}
