# React Pattern 
## Render Props Study

참고 링크
1. https://github.com/nhnent/fe.javascript/wiki/January-1---January-5,-2018
2. https://reactjs.org/docs/render-props.html

-- Render Prop --
React에서 컴포넌트의 로직을 재사용하기 위한 방법들
1. 믹스인 
2. HOC
3. Render Prop 

아래 부분은 https://github.com/nhnent/fe.javascript/wiki/January-1---January-5,-2018 의 내용을 넣었습니다.

믹스인의 문제
1. ES6 클래스 : 믹스인을 지원하지 않는다.
2. 간접성 (Indirection) : state를 변경하는 믹스인은 state가 어디서 왔는지를 파악하기 어렵게 만들며, 특히 하나 이상의 믹스인이 있는 경우 더 문제가 된다.
3. 네이밍 충돌 : 두 개의 믹스인이 state의 동일한 부분을 변경하려고 하면 서로를 덮어쓸 수도 있다. createClass API는 2개의 믹스인이 동일한 키를 참조하는 getInitialState를 갖고 있을 때 경고를 주는 검사 로직을 포함하고 있었지만, 완벽한 방어책은 아니었다.

HOC의 문제
1. ES6 클래스 : 그렇다! 여기는 전혀 문제가 없다. ES6 클래스로 만들어진 컴포넌트는 HOC와 함께 사용될 수 있다.
2. 간접성 : 여전히 믹스인을 사용할 때와 동일한 간접성의 문제가 있다. state가 어디서 오는지를 알아야 하는 대신, 어떤 prop이 어떤 HOC에 의해 제공되는지에 대해서 알아야 한다는 것만 다를 뿐이다.
3. 네이밍 충돌 : 불행하게도, 이 문제도 여전히 존재한다. 동일한 prop명을 사용하는 두 개의 HOC는 충돌할 수 있으며, 하나가 다른 하나를 덮어쓸 수 있다. 이 경우는 좀 더 교묘한데, 리액트는 prop 이름 충돌에 대해 경고를 해 주지 않기 때문이다. 😳

1번 mixin 방식은 createReact() 함수를 사용했을 때 자주 사용되었다.
공통적으로 쓰이는 로직을 mixin 함수로 뺀 다음 
createReact({
	mixin: [ 공통된 로직 mixin ]
})
해줌으로써 문제를 해결하였다.
const App = React.createClass({
  // 믹스인 사용하기
  mixins: [ MouseMixin ],

  render() {
    const { x, y } = this.state

    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        <h1>The mouse position is ({x}, {y})</h1>
      </div>
    )
  }
})

믹스인 방식과 HOC 방식의 문제점은 다른 믹스인, HOC들과 같이 사용할 경우 WrapperComponent로 전달해주는 state나 props값이 덮어씌어질수있다는 것이다.
믹스인 방식에서는 state를 주입해주고, HOC 방식에서는 props를 주입해주는데
만약 Cat 컴포넌트에 withWindowMouse, withWindowScroll HOC를 차례대로 적용해주는데 여기서 두 HOC가 동일한 프로퍼티의 props를 전달해준다면 WrapperComponent인 Cat에서는 가장 마지막에 적용된 HOC가 주입해준 props의 프로퍼티만 받는 문제가 있다.
그리고 두 번째 문제점은 믹스인이나 HOC나 둘 다 WrapperComponent에 주입되는 state 또는 props값이 어떻게 내려오는지, 어떻게 변경되는지 알기위해서 주입해주는쪽의 코드를 직접 봐야만 한다는 문제가 있다. HOC내부를 보기전까지는 내려받는 props가 어떻게 변경되거나 어떤 값이 내려오는지 알 수 없기 때문이다.

하지만 RenderProp 방식은 위 방식들과는 조금 다르다.

render prop은 컴포넌트가 무엇을 렌더링해야 할 지를 알기 위해 사용하는 함수 prop이다.

더 일반적으로 말하자면, 개념은 다음과 같다. 행위를 공유하기 위해 "첨가(mixing in)" 하거나 컴포넌트를 장식하는 대신에, 그저 상태를 공유하기 위해 사용할 수 있는 함수 prop를 이용해서 일반 컴포넌트를 렌더링하면 된다.

prop으로 전달해주기 때문에 로직을 공유하는 컴포넌트끼리 동일한 props를 전달해준다해서 위 처럼 겹쳐서 덮어씌워질일이 없다. renderProp으로 전달해주는 함수에서 인자로 받고 실제 props로 전해줄때는 다른 값으로 전해주면 되기 때문이다.

```
<div style={{ height: '100%' }}>
        <Mouse render={({ x, y }) => (
          // render prop이 여기서 렌더링에 필요한 상태를 전달해준다.
          <h1>The mouse position is ({x}, {y})</h1>
        )}/>
      </div>
```
Mouse 컴포넌트가 render prop을 통해 자신의 상태를 필수적으로 <App> 컴포넌트에게 노출한다는 점이다. 그러므로 <App> 은 그 상태를 이용해 원하는 무엇이든 렌더링할 수 있다.

그리고 HOC는 정적으로 컴포넌트가 선언된 다음 HOC에 연결해주는 반면

renderProp은 render메서드에안에서 사용이 가능하기에 리액트의 생명주기와 자연스러운 props, state의 흐름이 주는 이점을 취할 수 있다!

## 실제 render prop 패턴 사용 
React router의 withRouter HOC 
