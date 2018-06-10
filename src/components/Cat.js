import React, { Component, PureComponent } from 'react';


// Render Props를 사용할 경우 PureComponent로 인해 비교를하여도
// 항상 false로 새 props가 들어간다.
// export default class Cat extends PureComponent {
export default class Cat extends Component {
	constructor(props) {
		super(props);
	}
	render() {
	  const { x, y } = this.props.mouse;

	  const catImgUrl = 'http://mblogthumb4.phinf.naver.net/20120609_223/takkirio_1339210425187eG2Ta_JPEG/Tom1.jpg?type=w2';
		return (
      <img
        src={catImgUrl}
        style={{
          position: 'absolute',
          left: x,
          top: y,
        }}
      />
		);
	}
}