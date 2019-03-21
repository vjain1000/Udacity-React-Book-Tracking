import React, { Component } from 'react'
import './App.css'

class Shelf extends Component
{
  	_handleChange(event)
  	{
   		this.props.Change(event.target.value);
    	event.preventDefault();
  	}
  
	render()
	{
		return (
		<div className="list-books">
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.name}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.props.books.map(function(book, index){
                    	return <li key={book.id}> 
                          <div className="book" key={book.id}>
                          <div className="book-top" key={book.id}>
                  			<div className="book-cover" key={book.id} style={{width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.thumbnail + ')'}}>
								<div className="book-shelf-changer" key={book.id}>
                              	<select name={book.id} key={book.id} onChange={this.props.Change} value={book.shelf}>
                               		<option key="move" value="move" disabled>Move to...</option>
                                	<option key="currentlyReading" value="currentlyReading">Currently Reading</option>
                                	<option key="wantToRead" value="wantToRead">Want to Read</option>
                                	<option key="read" value="read">Read</option>
                                	<option key="none" value="none">None</option>
                              	</select>
                            	</div>
						    </div>
							</div>
							</div>
							<div className="book-title" key={book.title}>{book.title}</div>
                          	{book.authors.map( author => {return <div className="book-authors" key={author}>{author}</div>;})}
							</li>;
                  }.bind(this))}  
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
		)
	}
}

export default Shelf