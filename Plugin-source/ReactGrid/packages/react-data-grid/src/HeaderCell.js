const React          = require('react');
const ReactDOM      = require('react-dom');
const joinClasses    = require('classnames');
const ExcelColumn    = require('./PropTypeShapes/ExcelColumn');
const ResizeHandle   = require('./ResizeHandle');
const ContextDropDown   = require('./ContextDropDown');
require('../../../themes/react-data-grid-header.css');

const PropTypes      = React.PropTypes;

function simpleCellRenderer(objArgs: {column: {name: string}}): ReactElement {
  let headerText = objArgs.column.rowType === 'header' ? objArgs.column.name : '';
  return <div className="widget-HeaderCell__value">{headerText}</div>;
}


function onArrowClick(e){
  e.stopPropagation();


  // if clicked on the arrow button
  let headerCells = document.getElementsByClassName('is-open');
  for(let i =0;i<headerCells.length;i++){
    let el = headerCells[i];
    el.classList.remove('is-open');
  }
  
  let headerCell = e.target.closest('.react-grid-HeaderCell');
  headerCell.classList.add('is-open');
}

function bodyClickHandler(e){
  let headerCells = document.getElementsByClassName('is-open');
  for(let i =0;i<headerCells.length;i++){
    let el = headerCells[i];
    el.classList.remove('is-open');
  }
}

const HeaderCell = React.createClass({

  // propTypes: {
  //   renderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
  //   column: PropTypes.shape(ExcelColumn).isRequired,
  //   onResize: PropTypes.func.isRequired,
  //   height: PropTypes.number.isRequired,
  //   onResizeEnd: PropTypes.func.isRequired,
  //   className: PropTypes.string
  // },

  getDefaultProps(): {renderer: ReactComponent | (props: {column: {name: string}}) => ReactElement} {
    return {
      renderer: simpleCellRenderer
    };
  },

  getInitialState(): {resizing: boolean} {
    return {resizing: false};
  },

  onDragStart(e: SyntheticMouseEvent) {
    this.setState({resizing: true});
    // need to set dummy data for FF
    if (e && e.dataTransfer && e.dataTransfer.setData) e.dataTransfer.setData('text/plain', 'dummy');
  },

  onDrag(e: SyntheticMouseEvent) {
    let resize = this.props.onResize || null; // for flows sake, doesnt recognise a null check direct
    if (resize) {
      let width = this.getWidthFromMouseEvent(e);
      if (width > 0) {
        resize(this.props.column, width);
      }
    }
  },

  onDragEnd(e: SyntheticMouseEvent) {
    let width = this.getWidthFromMouseEvent(e);
    this.props.onResizeEnd(this.props.column, width);
    this.setState({resizing: false});
  },

  getWidthFromMouseEvent(e: SyntheticMouseEvent): number {
    let right = e.pageX || (e.touches && e.touches[0] && e.touches[0].pageX) || (e.changedTouches && e.changedTouches[e.changedTouches.length - 1].pageX);
    let left = ReactDOM.findDOMNode(this).getBoundingClientRect().left;
    return right - left;
  },

  getCell(): ReactComponent {
    if (React.isValidElement(this.props.renderer)) {
      // if it is a string, it's an HTML element, and column is not a valid property, so only pass height
      if (typeof this.props.renderer.type === 'string') {
        return React.cloneElement(this.props.renderer, {height: this.props.height});
      }
      return React.cloneElement(this.props.renderer, {column: this.props.column, height: this.props.height});
    }
    return this.props.renderer({column: this.props.column});
  },

  getStyle(): {width:number; left: number; display: string; position: string; overflow: string; height: number; margin: number; textOverflow: string; whiteSpace: string } {
    return {
      width: this.props.column.width,
      left: this.props.column.left,
      opacity: this.props.column.width === 0 ? 0: 1,
      display: 'inline-block',
      position: 'absolute',
      height: this.props.height,
      margin: 0,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    };
  },

  setScrollLeft(scrollLeft: number) {
    let node = ReactDOM.findDOMNode(this);
    node.style.webkitTransform = `translate3d(${scrollLeft}px, 0px, 0px)`;
    node.style.transform = `translate3d(${scrollLeft}px, 0px, 0px)`;
  },
  disableDefaultContext() {
//debugger;
    //bind event with arrow
    document.removeEventListener('click', this.handleArrowClick);
    document.addEventListener('click', this.handleArrowClick);

  },

  handleArrowClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const body = document.querySelector('body');
    body.removeEventListener('click', bodyClickHandler);
    body.addEventListener('click', bodyClickHandler);

    let headerCells = document.getElementsByClassName('is-open');
    for(let i =0;i<headerCells.length;i++){
      let el = headerCells[i];
      el.classList.remove('is-open');
    }
    
    let headerCell = e.target.closest('.react-grid-HeaderCell');
    !!headerCell ? headerCell.classList.add('is-open') : '';

    if(e.target.classList.contains('arrow-handle') || 
    e.target.parentElement.classList.contains('arrow-handle')){
      e.preventDefault();
      e.stopPropagation();

      //  click event handling
        let headerCells = document.getElementsByClassName('is-open');
        for(let i =0;i<headerCells.length;i++){
          let el = headerCells[i];
          el.classList.remove('is-open');
        }
    
        let headerCell = e.target.closest('.react-grid-HeaderCell');
        headerCell.classList.add('is-open');


    }

    //bind event to the arrow
    // const tEl = e.target;
    // const arrow = tEl.querySelector('.arrow-handle');
    // if(!!arrow){
    //   arrow.removeEventListener('click', onArrowClick);
    //   arrow.addEventListener('click', onArrowClick);
    // }
  },


  removeScroll() {
    let node = ReactDOM.findDOMNode(this);
    if (node) {
      let transform = 'none';
      node.style.webkitTransform = transform;
      node.style.transform = transform;
    }
  },

  render(): ?ReactElement {
    this.disableDefaultContext();
    let resizeHandle;
    if (this.props.column.resizable) {
      resizeHandle = (<ResizeHandle
      onDrag={this.onDrag}
      onDragStart={this.onDragStart}
      onDragEnd={this.onDragEnd}
      />);
    }

    let contextDropDown;
      contextDropDown = (<ContextDropDown
      onDrag={this.onDrag}
      onDragStart={this.onDragStart}
      onDragEnd={this.onDragEnd}
      isOpen={'isactive'}
      />);
      
    let className = joinClasses({
      'react-grid-HeaderCell': true,
      'react-grid-HeaderCell--resizing': this.state.resizing,
      'react-grid-HeaderCell--locked': this.props.column.locked
    });
    className = joinClasses(className, this.props.className, this.props.column.cellClass);
    let cell = this.getCell();
    return (
      <div className={className} style={this.getStyle()}>
        {cell}
        <span className="arrow-handle"></span>
        {resizeHandle}
      </div>
    );
  }
});

module.exports = HeaderCell;
