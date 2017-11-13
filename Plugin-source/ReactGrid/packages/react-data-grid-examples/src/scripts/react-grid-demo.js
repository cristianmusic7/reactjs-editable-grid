import React, { Component, onInit } from 'react'
import ReactGrid from '../components/ReactGrid';
import ReactPaginate from 'react-paginate';

import facker from 'faker';
const ReactDataGrid = require('react-data-grid');
const { Editors, Toolbar, Formatters } = require('react-data-grid-addons');
const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;
const { ImageFormatter } = Formatters;

faker.locale = 'en_US';


const columns = [];

let gridConfig = require('../assets/gridConfig.json');
const data = require('../assets/data/dataset.json');

// ReactGridDemo component
// This component uses the ReactGrid component
export default class ReactGridDemo extends Component{

  constructor(props) {
    super(props);

    this.state = {
      columnsFetched: false,
      rowsFetched: false
    }
  }

  componentWillMount() {
    gridConfig.values = this.createRows(gridConfig.demo.totalRowsCount-1 || 500);
    gridConfig.pagination.pageChangeCallback = this.pageChangeCallbackHandler;
    this.getColumns();
  }

  createRows(numberOfRows) {
    let rows = [];
    for (let i = 0; i < numberOfRows; i++) {
      rows[i] = this.createFakeRowObjectData(i);
    }
    rows.push({
      id: 'id_' + rows.length,
      avatar: faker.name.firstName(),
      invisible: faker.company.bs(),
      county: faker.address.county(),
      email: faker.internet.email(),
      title: faker.name.prefix(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      street: faker.address.streetName(),
      zipCode: faker.address.zipCode(),
      date: faker.date.past().toLocaleDateString(),
      bs: faker.company.bs(),
      catchPhrase: faker.company.catchPhrase(),
      companyName: faker.company.companyName(),
      words: faker.lorem.words(),
      sentence: faker.lorem.sentence()
    })
    //suimulate delay
    window.setTimeout(()=>{
      this.setState({
        rowsFetched: true
      })

    },1500)
    return rows;
  }

  createFakeRowObjectData(index) {
    return {
      id: 'id_' + index,
      avatar: faker.name.firstName(),
      invisible: faker.company.bs(),
      county: faker.address.county(),
      email: faker.internet.email(),
      title: faker.name.prefix(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      street: faker.address.streetName(),
      zipCode: faker.address.zipCode(),
      date: faker.date.past().toLocaleDateString(),
      bs: faker.company.bs(),
      catchPhrase: faker.company.catchPhrase(),
      companyName: faker.company.companyName(),
      words: faker.lorem.words(),
      sentence: faker.lorem.sentence(),

      id1: 'id_' + index,
      avatar1: faker.name.firstName(),
      invisible1: faker.company.bs(),
      county1: faker.address.county(),
      email1: faker.internet.email(),
      title1: faker.name.prefix(),
      firstName1: faker.name.firstName(),
      lastName1: faker.name.lastName(),
      street1: faker.address.streetName(),
      zipCode1: faker.address.zipCode(),
      date1: faker.date.past().toLocaleDateString(),
      bs1: faker.company.bs(),
      catchPhrase1: faker.company.catchPhrase(),
      companyName1: faker.company.companyName(),
      words1: faker.lorem.words(),
      sentence1: faker.lorem.sentence(),

      id2: 'id_' + index,
      avatar2: faker.name.firstName(),
      invisible2: faker.company.bs(),
      county2: faker.address.county(),
      email2: faker.internet.email(),
      title2: faker.name.prefix(),
      firstName2: faker.name.firstName(),
      lastName2: faker.name.lastName(),
      street2: faker.address.streetName(),
      zipCode2: faker.address.zipCode(),
      date2: faker.date.past().toLocaleDateString(),
      bs2: faker.company.bs(),
      catchPhrase2: faker.company.catchPhrase(),
      companyName2: faker.company.companyName(),
      words2: faker.lorem.words(),
      sentence2: faker.lorem.sentence(),

      
      id3: 'id_' + index,
      avatar3: faker.name.firstName(),
      invisible3: faker.company.bs(),
      county3: faker.address.county(),
      email3: faker.internet.email(),
      title3: faker.name.prefix(),
      firstName3: faker.name.firstName(),
      lastName3: faker.name.lastName(),
      street3: faker.address.streetName(),
      zipCode3: faker.address.zipCode(),
      date3: faker.date.past().toLocaleDateString(),
      bs3: faker.company.bs(),
      catchPhrase3: faker.company.catchPhrase(),
      companyName3: faker.company.companyName(),
      words3: faker.lorem.words(),
      sentence3: faker.lorem.sentence(),

      
      id4: 'id_' + index,
      avatar4: faker.name.firstName(),
      invisible4: faker.company.bs(),
      county4: faker.address.county(),
      email4: faker.internet.email(),
      title4: faker.name.prefix(),
      firstName4: faker.name.firstName(),
      lastName4: faker.name.lastName(),
      street4: faker.address.streetName(),
      zipCode4: faker.address.zipCode(),
      date4: faker.date.past().toLocaleDateString(),
      bs4: faker.company.bs(),
      catchPhrase4: faker.company.catchPhrase(),
      companyName4: faker.company.companyName(),
      words4: faker.lorem.words(),
      sentence4: faker.lorem.sentence(),

      
      id5: 'id_' + index,
      avatar5: faker.name.firstName(),
      invisible5: faker.company.bs(),
      county5: faker.address.county(),
      email5: faker.internet.email(),
      title5: faker.name.prefix(),
      firstName5: faker.name.firstName(),
      lastName5: faker.name.lastName(),
      street5: faker.address.streetName(),
      zipCode5: faker.address.zipCode(),
      date5: faker.date.past().toLocaleDateString(),
      bs5: faker.company.bs(),
      catchPhrase5: faker.company.catchPhrase(),
      companyName5: faker.company.companyName(),
      words5: faker.lorem.words(),
      sentence5: faker.lorem.sentence(),

      
      id6: 'id_' + index,
      avatar6: faker.name.firstName(),
      invisible6: faker.company.bs(),
      county6: faker.address.county(),
      email6: faker.internet.email(),
      title6: faker.name.prefix(),
      firstName6: faker.name.firstName(),
      lastName6: faker.name.lastName(),
      street6: faker.address.streetName(),
      zipCode6: faker.address.zipCode(),
      date6: faker.date.past().toLocaleDateString(),
      bs6: faker.company.bs(),
      catchPhrase6: faker.company.catchPhrase(),
      companyName6: faker.company.companyName(),
      words6: faker.lorem.words(),
      sentence6: faker.lorem.sentence()


    };
  }

  getColumns() {
    let clonedColumns = [];
    // this.fetchPromise()
    // .then(data => {
    //   clonedColumns = data;
    //   gridConfig.columnArray = data.columns;
    //   this.setState({"columnsFetched" : true});
    // });
    gridConfig.columnArray = data.columns;
    this.setState({"columnsFetched" : true});
  }

  fetchPromise() {
    return new Promise((resolve) => {
      const data = require('../assets/data/dataset.json');
      resolve(data);
    });
  }

  handleGridRowsUpdated({ fromRow, toRow, updated }) {
    let rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = React.addons.update(rowToUpdate, {$merge: updated});
      rows[i] = updatedRow;
    }

    this.setState({ rows });
  }

  handleAddRow({ newRowIndex }) {
    const newRow = {
      value: newRowIndex,
      userStory: '',
      developer: '',
      epic: ''
    };

    let rows = this.state.rows.slice();
    rows = React.addons.update(rows, {$push: [newRow]});
    this.setState({ rows });
  }

  getRowAt(index) {
    if (index < 0 || index > this.getSize()) {
      return undefined;
    }

    return this.state.rows[index];
  }

  getSize() {
    return this.state.rows.length;
  }

  /* this event is triggered when the page changes happens in the 'ReactGrid' component */

  pageChangeCallbackHandler(object) {
    console.log('page change event occured in ReactGrid component');
    console.log('current page is: ' + object.selected);
  }

  render() {
    return (
    <div className="datagrid-wrap">
      {      
        !!this.state.columnsFetched && !!this.state.rowsFetched
        ? (
        <ReactGrid 
          config = {gridConfig}
        />
        ) 
        :(<div>Loading...</div>)
      }
    </div>
    );
  }
}

