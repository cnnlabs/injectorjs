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
        <div>You {text} this.</div>
        <div>Click to toggle</div>
        <div>click count {count}.</div>
      </p>
    );
  }
});

ReactDOM.render(
  <LikeButton />,
  document.getElementById('example')
);
