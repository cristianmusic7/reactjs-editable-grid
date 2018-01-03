import React, {PropTypes} from 'react';
import {ContextMenu} from '@cristian77/react-contextmenu';

class ReactDataGridContextMenu extends React.Component {
  render() {
    return (
      <ContextMenu id="reactDataGridContextMenu">
        {this.props.children}
      </ContextMenu>
    );
  }
}

ReactDataGridContextMenu.propTypes = {
  children: PropTypes.node
};

export default ReactDataGridContextMenu;
