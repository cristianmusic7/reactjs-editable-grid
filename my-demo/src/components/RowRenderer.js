import React, { Component } from 'react'
// import ReactPaginate from 'react-paginate';
import { Row } from '@sans/react-grid/packages/react-data-grid/dist/react-data-grid';

export default class RowRenderer extends Component{
  constructor(props) {
    super(props);

    this.setScrollLeft = this.setScrollLeft.bind(this);
    this.getRowStyle = this.getRowStyle.bind(this);

    this.state = {

    };

  }
  setScrollLeft(scrollBy) {
    // if you want freeze columns to work, you need to make sure you
    // implement this as a pass through
    this.refs.row.setScrollLeft(scrollBy);
  }

  getRowStyle() {
    return {
      color: '#333'
    };
  }


  render() {
    // here we are just changing the style
    // but we could replace this with anything we liked, cards, images, etc
    // usually though it will just be a matter of wrapping a div, and then calling back through to the grid
    if (this.props.row.isFooter) {
      return (<div className={"grid-footer "}
           style={{
               height: this.props.height,
               left: this.props.columns[0].left,
               contain: "layout"
           }}>
        <Row ref = "row" { ...this.props } />
      </div>);
     }
    return ( <div style = {
        this.getRowStyle()
      } > <Row ref = "row" { ...this.props } />
      </div> );
  }
}
