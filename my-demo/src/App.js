import React, { Component } from 'react'
import ReactGrid from './components/ReactGrid';

import faker from 'faker';
require('./assets/css/bootstrap.min.css');
require('./assets/css/demo.css');
require('./assets/css/ReactGrid.css');

faker.locale = 'en_US';


let gridConfig = require('./assets/gridConfig.json');
const data = require('./assets/data/dataset.json');

//Default options for generating columns and rows.
const generateRowOptions = [20,50,100,200,500,1000,2000];
const generateColOptions = [10,20,25,40,50,60,80,100];
const defaultRows = 200;
const defaultCols = 50;

//Flag variable that enables the visibility of the performance tests info
//Change this to true in order to see the performance test info and options.
const performanceTest = false;


// ReactGridDemo component
// This component uses the ReactGrid component
export default class ReactGridDemo extends Component{

  constructor(props) {
    super(props);

    this.state = {
      columnsFetched: false,
      rowsFetched: false,
      loadingGrid: false,
      renderTime: 0
    }

    this.isrendering = false;
    this.isloading = false;
    this.isGeneratingData = false;
    this.startRenderTime = 0;
    this.renderDisabled = true;
    this.generateRowValue = defaultRows;
    this.generateColValue = defaultCols;
  }

  componentWillMount() {
    gridConfig.pagination.pageChangeCallback = this.pageChangeCallbackHandler || gridConfig.demo.totalRowsCount-1;
  }

  componentDidUpdate(){
    var _this = this;
    window.requestAnimationFrame(function() {
        if(_this.isrendering){           
          _this.isrendering = false;
          _this.isloading = false;
          _this.setState({"renderTime" : Date.now() - _this.startRenderTime});
          _this.startRenderTime = 0;
        }else if(_this.isloading){
          window.setTimeout(()=>{
            _this.isrendering = true;
            _this.getColumns();            
          });          
        }else if(_this.isGeneratingData){
          _this.isGeneratingData = false;
        }
    });
  }

  createRows(numberOfRows) {
    let rows = [];
    for (let i = 0; i < numberOfRows; i++) {
      rows[i] = this.createFakeRowObjectData(i);
    }
    //suimulate delay
    // window.setTimeout(()=>{
      this.setState({
        rowsFetched: true
      })

    // },1500)
    return rows;
  }

  //Create fake data for testing according with itemTypes and the data provided.
  createFakeRowObjectData(index) {
    let row = {};
    row.sno = index;

    let colNumber = this.generateColValue || data.columns.length;
    for (let i = 0; i < colNumber; i++) {
      let idxKey = data.columns[i].key;

      if(data.columns[i].itemType === "CheckBox"){
        row[idxKey] = [true,false][Math.round(Math.random())];
      }else if(data.columns[i].itemType === "Custom"){
        row[idxKey] = {option:data.columns[i].values[Math.floor((Math.random() * data.columns[i].values.length-1) + 1)],name:faker.name.firstName()};
      }else if(idxKey.startsWith("id")){
        row[idxKey] = 'id_' + index;
      }else if(idxKey.startsWith("avatar")){
        row[idxKey] = faker.name.firstName();
      }else if(idxKey.startsWith("invisible")){
        row[idxKey] = faker.company.bs();
      }else if(idxKey.startsWith("county")){
        row[idxKey] = faker.address.county();
      }else if(idxKey.startsWith("email")){
        row[idxKey] = faker.internet.email();
      }else if(idxKey.startsWith("title")){
        row[idxKey] = faker.name.prefix();
      }else if(idxKey.startsWith("day")){
        row[idxKey] = data.columns[i].values[Math.floor((Math.random() * data.columns[i].values.length-1) + 1)];
      }else if(idxKey.startsWith("firstName")){
        row[idxKey] = faker.name.firstName();
      }else if(idxKey.startsWith("lastName")){
        row[idxKey] = faker.name.lastName();
      }else if(idxKey.startsWith("street")){
        row[idxKey] = faker.address.streetName();
      }else if(idxKey.startsWith("zipCode")){
        row[idxKey] = faker.address.zipCode();
      }else if(idxKey.startsWith("date")){
        row[idxKey] = faker.date.past().toLocaleDateString();
      }else if(idxKey.startsWith("bs")){
        row[idxKey] = faker.company.bs();
      }else if(idxKey.startsWith("catchPhrase")){
        row[idxKey] = faker.company.catchPhrase();
      }else if(idxKey.startsWith("companyName")){
        row[idxKey] = faker.company.companyName();
      }else if(idxKey.startsWith("words")){
        row[idxKey] = faker.lorem.words();
      }else if(idxKey.startsWith("sentence")){
        row[idxKey] = faker.lorem.sentence();
      }
    };

    return row;
  }

  getColumns() {
    gridConfig.columnArray = data.columns.slice();

    if(this.generateColValue){
      gridConfig.columnArray.splice(this.generateColValue,data.columns.length - this.generateColValue);
    }    
  
    this.setState({"columnsFetched" : true});
  }

 fetchPromise() {
    return new Promise((resolve) => {
      const data = require('./assets/data/dataset.json');
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

  generateData = (event) => {
    this.isGeneratingData = true;
    let dtStart = Date.now();
    gridConfig.values = this.createRows(this.generateRowValue);  
    let dtEnd = Date.now();
    this.generateTime = dtEnd - dtStart;
    this.renderDisabled = false;
  };

  renderGrid = (event) => {
    this.startRenderTime = Date.now();
    this.isloading = true;
    this.setState({"columnsFetched" : false}); 
    this.renderDisabled = true;
    this.isGeneratingData = false;
  };

  generateRowChange = (event) => {   
    this.generateRowValue = event.currentTarget.value;
  };

  generateColChange = (event) => {   
    this.generateColValue = event.currentTarget.value;
  };

  renderOptions = (options) => {
    let htmlOptions = [];
    options.forEach(function(number) {
        htmlOptions.push(<option key={number} value={number}>{number}</option>);
    }, this);
    return htmlOptions;
  }

  render() {
    return (
    <div className="demo">
      <header className="demo-header">
        ReactGrid Component Demo
      </header>
      <div className={performanceTest? 'show-options':''}>
        <div className="data-handling">
          <h4>Generate Data</h4>          
          <div className="perf-options">
            Number of Rows   
            <select ref={(node) => this.select = node} defaultValue={defaultRows} onChange={this.generateRowChange} >
              {this.renderOptions(generateRowOptions)}
            </select>
            Columns to Generate
            <select ref={(node) => this.select2 = node} defaultValue={defaultCols} onChange={this.generateColChange} >
              {this.renderOptions(generateColOptions)}
            </select>
          </div> 
          <button ref={(node) => this.generateButton = node} onClick={this.generateData}>Generate Data</button> 
          <div className="perf-time">
            Time Taken to Generate Data: {this.generateTime? this.generateTime + ' ms':''} 
          </div>                   
        </div>
        <div className="data-handling">
          <h4>Render Data</h4>
          <button onClick={this.renderGrid} disabled={this.renderDisabled}>Render Grid</button>
          <div className="perf-time">
            Time Taken to Render Data: {this.state.renderTime? this.state.renderTime+ ' ms':''}
          </div>   
        </div>
      </div>
      <div className="datagrid-wrap">
        {      
          !!this.isGeneratingData
          ? (
          <div className="state-info">Data Generated</div>
          ) 
          :(<div></div>)
        }
        {      
          !!this.isloading
          ? (
          <div className="state-info">Loading...</div>
          ) 
          :(<div></div>)
        }
        {
          !!this.state.columnsFetched && !!this.state.rowsFetched
          ? (
          <ReactGrid 
            config = {gridConfig}
          />
          ) 
          :(<div></div>)
        }
      </div>
      
    </div>
    );
  }
}

