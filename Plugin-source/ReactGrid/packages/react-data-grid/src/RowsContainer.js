import React, {PropTypes} from 'react';

const SimpleRowsContainer = (props) => {
  return (
    <div key="rows-container">
      {props.rows}
    </div>
  );
};

SimpleRowsContainer.propTypes = {
  width: PropTypes.number,
  rows: PropTypes.array
};

class RowsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.plugins = props.window ? props.window.ReactDataGridPlugins : window.ReactDataGridPlugins;
    this.hasContextMenu = this.hasContextMenu.bind(this);
    this.renderRowsWithContextMenu = this.renderRowsWithContextMenu.bind(this);
    this.getContextMenuContainer = this.getContextMenuContainer.bind(this);
    this.state = {ContextMenuContainer: this.getContextMenuContainer(props)};
  }

  getContextMenuContainer() {
    if (this.hasContextMenu()) {
      if (!this.plugins) {
        throw new Error('You need to include ReactDataGrid UiPlugins in order to initialise context menu');
      }
      return this.plugins.Menu.ContextMenuTrigger;
    }
  }

  hasContextMenu() {
    return this.props.contextMenu && React.isValidElement(this.props.contextMenu);
  }

  renderRowsWithContextMenu() {
    let ContextMenuRowsContainer = this.state.ContextMenuContainer;
    // Initialise the context menu if it is available
    return (
      <div>
        <ContextMenuRowsContainer id="reactDataGridContextMenu" holdToDisplay={-1}>
          <SimpleRowsContainer {...this.props} />
        </ContextMenuRowsContainer>
      </div>
    );
  }

  render() {
    return this.hasContextMenu() ? this.renderRowsWithContextMenu() : <SimpleRowsContainer {...this.props} />;
  }
}

RowsContainer.propTypes = {
  contextMenu: PropTypes.element,
  window: PropTypes.object
};

export default RowsContainer;
export {SimpleRowsContainer};
