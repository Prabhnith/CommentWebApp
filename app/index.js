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
        <h3 className="commentAuthor">
          {this.props.author}
        </h3>
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
	  this.props.onCommentSubmit({author: author, text: text});
		commentData = this.props.commentData.concat([{author, text}]);
		localStorage.setItem('todos', JSON.stringify(commentData));
		this.setState({ author:'', text:''});
		// TODO: Here you may send reqdata = data.concat([{id, task, complete}]);uest to the server
	},
  render: function() {
    return (
      <form className="commentForm form-horizontal container">
				<div className="form-group col-md-10 container">
					<input type="text" placeholder="type your name"
					 			 value={this.state.author}
								 onChange={this.handleAuthorchange} />
					<br />
					<input type="text" placeholder="your comment here..."
					 			 value={this.state.text}
								 onChange={this.handleTextchange} />
	        <br />
					<input type="submit" value="post" onSubmit={this.handleSubmit} />
				</div>
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
			<div className="commentBox well ">
				<div className="header ">
					<h1 className="vert-offset-top-0 jumbotron"	>Comments</h1>
				</div>
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
