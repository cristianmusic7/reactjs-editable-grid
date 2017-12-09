// File for showing the default display of the cell of thos custom edit type
import React from 'react';
import PropTypes from 'prop-types'
require('../assets/css/react-data-grid-custom.css');

export default class CustomEditorFormatter extends React.Component {
  //Format of the props.
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        options: React.PropTypes.arrayOf(PropTypes.string),
        name: PropTypes.string
      })
    ])
  };

  //Here goes the custom html needed to show the values on the cell when your not editing the cell.
  render(): ? ReactElement {
      return (<div title="select title">{this.props.value.option} {this.props.value.name}</div>);
  }
}
