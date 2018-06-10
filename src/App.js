import React, { Component } from 'react';
import ViewMousePoint from './components/ViewMousePoint';
import Cat from './components/Cat';

class App extends Component {
  render() {
    return (
      <main>
        <ViewMousePoint
          render={
            ({ x, y }) => (
              // render prop이 여기서 렌더링에 필요한 상태를 전달해준다.
              <h1>The mouse position is ({x}, {y})</h1>
            )
          }
        />
        <br />
        <ViewMousePoint
          render={
            (state) => {
              console.log(state);
              return (
                <h1>Render Props!</h1>
              )
            }
          }
        />
        <br />
        <ViewMousePoint
          render={
            (state) => {
              return (
                <Cat
                  mouse={state}
                />
              );
            }
          }
        />

      </main>
    );
  }
}

export default App;
