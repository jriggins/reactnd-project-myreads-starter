import React from 'react'

export default function Book({book, onBookshelfChange}) {
  const updateBookshelf = (book, shelf) => Object.assign({}, book, {shelf})
  const getSelectedBookshelf = (event) => event.target.value
  const onBookshelfSelectChange = (event) => onBookshelfChange(updateBookshelf(book, getSelectedBookshelf(event)))
  const {title, author, coverUrl, shelf = "none"} = book

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${coverUrl})`}}></div>
        <div className="book-shelf-changer">
          <select value={shelf} onChange={onBookshelfSelectChange}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{author}</div>
    </div>
  )
}
