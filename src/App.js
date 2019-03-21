import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import Search from './Search'
import Shelf from './Shelf'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    shelvedBooks: [],
    showSearchPage: false
  }

	_handleChange(event)
	{
      const bookId = {'id': event.target.name };
      const apiResp= BooksAPI.update(bookId, event.target.value);

  	  apiResp.then(resp => {
        		if (!resp || resp.error)
                {
                	this.setState( (prevState) => ({showSearchPage: prevState.showSearchPage, shelvedBooks: prevState.shelvedBooks }));  
                }
        		else
                { 
                  this._refreshState();
				}
      		});
	}

	_refreshState()
	{
  		const books = BooksAPI.getAll();
		books.then(resp => {
        		if (!resp || resp.error)
                {
                	this.setState( (prevState) => ({showSearchPage: prevState.showSearchPage, shelvedBooks: prevState.shelvedBooks }));  
                }
        		else
                {
        			this.setState( (prevState) => ({showSearchPage: prevState.showSearchPage, shelvedBooks: resp })); 
				}
      		});
	}

  	componentDidMount()
	{
      	this._refreshState();
	}

  render() {
    return (
      <div className="app">
       <Route exact path='/search' render={ () => (
    		<Search books={this.state.shelvedBooks} Change={this._handleChange.bind(this)} />
    	)} />
		<Route exact path='/' render={ () => (
          	<div>
          	<div className="list-books-title">
              <h1>MyReads</h1>
            </div>
			<Link to="./search">Search Page</Link>
    		<Shelf name={"Currently Reading"} books={this.state.shelvedBooks.filter(book => book.shelf === "currentlyReading")} Change={this._handleChange.bind(this)} />
			<Shelf name={"Read"} books={this.state.shelvedBooks.filter(book => book.shelf === "read")} Change={this._handleChange.bind(this)} />
			<Shelf name={"Want To Read"} books={this.state.shelvedBooks.filter(book => book.shelf === "wantToRead")} Change={this._handleChange.bind(this)} />
			</div>
    	)} />
      </div>
    )
  }
}

export default BooksApp
