import React, { Component, onInit } from 'react'
import ReactPaginate from 'react-paginate';
import { HeaderRow } from 'react-data-grid';

export default class HeaderRenderer extends Component{
  constructor(props) {
    super(props);


    this.state = {};

  }


  render() {
    return ( <div className={this.props.columnClass} > <HeaderRow ref = "row" { ...this.props } />
      </div> );
  }
}