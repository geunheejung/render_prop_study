import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ViewMousePoint extends Component {
	constructor(props) {
		super(props);

		this.state = {
		  x: 0,
      y: 0,
    }
	}

	static propTypes = {
		render: PropTypes.func.isRequired,
	};

	componentDidMount() {
		window.addEventListener('mousemove', this.handleMouseMove);
	}

	handleMouseMove = e => {
		this.setState({
			x: e.clientX,
			y: e.clientY,
		})
	};

	render() {
		// render용 즉 HOC로 치면 WapperComponent를 render라는 함수를 props로 전달함으로써 대체하는데
		// HOC에서는 WrapperComponent에 값을 전해줄 때 this.props를 풀어서 전달해줬는데 여기서는 현재 컴포넌트의 state값을 props로 받은 render함수에 주입해줌으로써 해결 했다.
		return (
      <div
				style={{ height: '100%' }}
			>
				{this.props.render(this.state)}
      </div>
		);
	}
}

export default ViewMousePoint;