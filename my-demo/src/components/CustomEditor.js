// Shows the visualization of the edit state of the cell after doing double click on it
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
const { editors: { EditorBase } } = require('@lunarkid/react-data-grid/packages/react-data-grid/dist/react-data-grid');

//Custom styles of your component
require('../assets/css/react-data-grid-custom.css');

export default class CheckboxEditor extends EditorBase {
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

  //Required for editor type component
  getInputNode() {
    return ReactDOM.findDOMNode(this);
  }

  onClick() {
    this.getInputNode().focus();
  }

  onDoubleClick() {
    this.getInputNode().focus();
  }

  // Returns the data that you have chose through the inputs and update the cell value
  // The structure of the data must be the same to the format of the props that you
  // using inside the component.

  getValue() {
    let value = {};
    value[this.props.column.key] = {option:this.select.value, name: this.input.value};
    return value;
  }

  render(): ? ReactElement {
    //Here goes the custom html needed to create your custom edit type.
    //In this case goes the select for the dropdown and the input text for the text field.
    return (
      <div className="react-grid-checkbox-custom" onBlur={this.props.onBlur}>
        <select ref={(node) => this.select = node} defaultValue={this.props.value.option} onChange={this.onChange} >
          {this.renderOptions()}
        </select>
        <input ref={(node) => this.input = node} type="text" className="form-control" defaultValue={this.props.value.name} />
      </div>);
  }

  //Helper fuction used to create the option for the dropdown.
  renderOptions(): Array<ReactElement> {
    let options = [];
    this.props.options.forEach(function(name) {
      if (typeof(name) === 'string') {
        options.push(<option key={name} value={name}>{name}</option>);
      } else {
        options.push(<option key={name.id} value={name.value} title={name.title}  >{name.text || name.value}</option>);
      }
    }, this);
    return options;
  }
}
