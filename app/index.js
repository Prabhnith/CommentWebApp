var React = require('react')
var ReactDOM = require('react-dom')
var Remarkable = require('remarkable');

var Comment = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

var CommentList = React.createClass({
	render: function(){
		var commentNodes = this.props.data.map(function(comment){
			return(
				<Comment author={comment.author} key={comment.id}>
					{comment.text}
					</Comment>
			)
		})
		return(
			<div className="commentList">
				{commentNodes}
   		</div>
		);
	}
});

var CommentForm = React.createClass({
	getInitialState: function(){
		return {
			author :'',
			text: ''
		};
	},
	handleAuthorchange: function(e){
		this.setState({
				author: e.target.value
		});
	},
	handleTextchange: function(e){
		this.setState({
				text : e.target.value
		});
	},
	handleSubmit: function(e){
		e.preventDefault();
		var author = this.state.author.trim();
		var text = this.state.text.trim();
		if (!text || !author){
			return;
		}
		commentData = this.props.commentData.concat([{author, text}]);
		localStorage.setItem('todos', JSON.stringify(commentData));
		// TODO: Here you may send reqdata = data.concat([{id, task, complete}]);uest to the server
	},
  render: function() {
    return (
      <form className="commentForm">
					<input type="text" placeholder="type your name"
					 			 value={this.state.author}
								 onChange={this.handleAuthorchange} />
					<br />
					<input type="text" placeholder="your comment here..."
					 			 value={this.state.text}
								 onChange={this.handleTextchange} />
	        <br />
					<input type="submit" value="post" onSubmit={this.handleSubmit} />
      </form>
			);
	}
});

var CommentBox = React.createClass({
	getInitialState: function(){
		return {
		commentData : this.props.commentData
	};
	},
	handleCommentSubmit: function(comment){
		//TODO: submit to the server and refresh the list
		// commentData = commentData.concat([{id, task, complete}]);
		// localStorage.setItem('todos', JSON.stringify(commentData));
	},
	render: function(){
		return(
			<div className="commentBox">
			<h1>Comments</h1>
					<CommentList data={this.props.commentData}/>
					<CommentForm onCommentSubmit={this.handleCommentSubmit}/>
   		</div>
		);
	}
});

// var commentData = JSON.parse(localStorage.getItem('comments')) || [];
commentData = [
  {id: 1, author: "Prabhjot Singh ", text: "Let's learn new everyday"},
  {id: 2, author: "Jordan Walke", text: "This is *great* "}
];
//if you want to fetch comments from the server itself
//use <CommentBox url="/api/coments" />
ReactDOM.render(<CommentBox commentData={commentData}/>,	document.getElementById('commentApp'));
