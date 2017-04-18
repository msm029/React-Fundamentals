import React, { PropTypes } from 'react'

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
};

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.originalText = props.text;
    this.state = {
      text: this.originalText,
    };
  }
  componentDidMount() {
    const stopper = this.originalText + '...'
    this.interval = setInterval(function () {
      if (this.state.text === stopper) {
        this.setState(function () {
          return {
            text: this.originalText
          }
        });
      } else {
        this.setState(function (prevState) {
          return {
            text: prevState.text + '.'
          }
        })
      }
    }.bind(this), this.props.speed)
  }
  componentWillUnmount() {
    window.clearInterval(this.interval)
  }
  render() {
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    )
  }
}

Loading.propTypes = {
  text: PropTypes.string,
  speed:PropTypes.number
};

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
};

export default Loading