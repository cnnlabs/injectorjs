var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
    this.setState({count: this.state.count++});
  },
  render: function() {

    if(!this.state.count && this.state.count != 0){
      this.state.count = 0;
    } else {
      this.state.count++;
    }
    var count = this.state.count;


    var text = this.state.liked ? 'like' : 'don\'t like';
    return (
      <p onClick={this.handleClick}>
        You {text} this.<br />
        Click to toggle<br />
        click count {count}.<br />
      </p>
    );
  }
});

ReactDOM.render(
  <LikeButton />,
  document.getElementById('example')
);
