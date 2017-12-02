import React from 'react';
import PropTypes from 'prop-types'
const { Menu: { ContextMenu, MenuItem } } = require('@knd/react-grid/packages/react-data-grid-addons/dist/react-data-grid-addons');

export default class GridContextMenu extends React.Component {
  static propTypes = {
    onFreezeColumn: PropTypes.func.isRequired,
    onFreezeRows: PropTypes.func.isRequired,
    onSetColumnDraggable: PropTypes.func.isRequired,
    columnGetter: PropTypes.func.isRequired,
    rowIdx: PropTypes.number,
    idx: PropTypes.number
  };
  
  constructor(props) {
    super(props);
    
    this.onFreezeColumn = this.onFreezeColumn.bind(this);
    this.onFreezeRows = this.onFreezeRows.bind(this);
    this.onSetColumnDraggable = this.onSetColumnDraggable.bind(this);
  }

  onFreezeColumn = (e, data) => {
    if (typeof(this.props.onFreezeColumn) === 'function') {
      this.props.onFreezeColumn(data.idx, data.value);
    }
  };

  onFreezeRows = (e, data) => {
    if (typeof(this.props.onFreezeRows) === 'function') {
      this.props.onFreezeRows(data.rowIdx);
    }
  };

  onSetColumnDraggable = (e, data) => {
    if (typeof(this.props.onSetColumnDraggable) === 'function') {
      this.props.onSetColumnDraggable(data.idx, data.value);
    }
  };


  render() {
    const showColumnMenu = this.props.rowIdx === -1 && this.props.idx >= 0;
    const showRowMenu = this.props.idx === 0 && this.props.rowIdx >= 0;
    const isColumnDraggable = !!this.props.columnGetter(this.props.idx).draggable;
    const isColumnFrozen = !!this.props.columnGetter(this.props.idx).locked;
    
    return ((showColumnMenu || showRowMenu) &&
      <ContextMenu>
        { showColumnMenu && 
          <MenuItem data={{idx: this.props.idx, value: !isColumnFrozen}} onClick={this.onFreezeColumn}>
            <input type="checkbox" checked={isColumnFrozen} readOnly={true}/>
            Frozen column
          </MenuItem> }
        { showColumnMenu && 
          <MenuItem data={{idx: this.props.idx, value: !isColumnDraggable}} onClick={this.onSetColumnDraggable}>
            <input type="checkbox" checked={isColumnDraggable} readOnly={true}/>
            Draggable column
          </MenuItem> }
        { showRowMenu && <MenuItem data={{rowIdx: this.props.rowIdx - 1}} disabled={this.props.rowIdx <= 0} onClick={this.onFreezeRows}>Freeze rows above</MenuItem> }
        { showRowMenu && <MenuItem data={{rowIdx: -1}} onClick={this.onFreezeRows}>Unfreeze all rows</MenuItem> }
      </ContextMenu>
    );
  }
}
