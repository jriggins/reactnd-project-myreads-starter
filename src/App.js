import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksApi from './BooksAPI.js'
import Home from './Home.js'
import Search from './Search.js'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    this.getAllBooksFromServer()
      .then(this.setBooksStateFromServer)
  }

  getAllBooksFromServer = () => {
    return BooksApi.getAll()
      .then(this.fromJsonToBook)
  }

  fromJsonToBook = (books) => books.map(this.getCoverUrlFrom)

  getCoverUrlFrom = (book) => ({...book, coverUrl: book.imageLinks.thumbnail})

  setBooksStateFromServer = (books) => this.setState({books})

  updateBookState = (updatedBook) => {
    this.setState((prevState) => ({
      books: [...prevState.books.filter((book) => book.id !== updatedBook.id), updatedBook]
    }))
  }

  updateBookshelf = (updatedBook) => {
    return BooksApi
      .update(updatedBook, updatedBook.shelf)
      .then(() => updatedBook)
  }

  onBookshelfChange = (updatedBook) => {
    this
      .updateBookshelf(updatedBook)
      .then(this.updateBookState)
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <Home books={this.state.books} onBookshelfChange={this.onBookshelfChange}/>}/>
        <Route exact path="/search" render={() => <Search/>}/>
      </div>
    )
  }
}

export default BooksApp
