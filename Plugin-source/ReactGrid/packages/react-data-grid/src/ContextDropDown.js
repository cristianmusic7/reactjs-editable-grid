const React          = require('react');
require('../../../themes/react-data-grid-header.css');

const ContextDropDown   = React.createClass({
  render(): ?ReactElement {
    return (
      <div className={"context-menu " + this.props.isOpen}>
        <ul>
          <li>Fix column</li>
          <li>UnFix column</li>
        </ul>
      </div>
    );
  }
});

module.exports = ContextDropDown;
