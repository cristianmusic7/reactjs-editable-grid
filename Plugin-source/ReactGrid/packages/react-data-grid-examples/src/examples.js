import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter, {Route, RouteHandler} from 'react-router';
import ReactGridDemo from './scripts/react-grid-demo';

window.React = React;

class App extends React.Component {
  render() {
    return (
      <div>
        <RouteHandler />
     
      </div>
    );
  }
}

let routes = (
  <Route handler={App}></Route>
);

/* render component */
ReactRouter.run(routes, function(Handler) {
  ReactDOM.render(<ReactGridDemo />, document.getElementById('example'));
});
