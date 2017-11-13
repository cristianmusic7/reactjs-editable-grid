# ReactGrid component

## Pre-requisites
- node 6.9+

## Installation & deploy

```
$ cd ~/react-data-grid
$ npm install
$ npm start
```


## Config
The gridConfig.json can be found in `~/packages/react-data-grid-examples/src/assets/gridConfig.json`

## Plugin usage 

```sh
import ReactGrid from '../components/ReactGrid';

render() {
  ...
  <ReactGrid 
    config = {gridConfig}
  />
}
```

the `gridConfig` is the configuration variable.

Ref. `~/packages/react-data-grid-examples/src/scripts/react-grid-demo.js` for more detials


### Columns Array data structure
Following data structure has been used for column data:

For header styling css properties of header can also be updated/addded in `assets/css/custom-style.css`

```js
id                     | description                                            
-----------------------|--------------------------------------------------------
"key"                  | Field from Values Array that needs to be displayed     
"name"                 | Header Text: By default Field value,                   
"alignment"            | Alignment body content                                 
"headerAlignment"      | Header Alignment                                       
"editItemTemaplate"    | "text": for textbox currently only support text,       
                       |  for "checkbox, combobox" component is required to be build but that is out of scope. Ref: topcoder forum              
"width"                | width                                                  
"resizable"            | true/false :column is resizable or not                                       
"editable"             | true/false :Read Only : Make the column readonly                   
"visible"              | Visible : true  / false                                
"footerText"           | Footer Text                                            
"columnClass"          | Column Class                                           
"footerStyle"          |  Footer Style : CSS Classes                            

```

```js
const gridConfig = {
  "pagination": {
    "pageSize": 10,               // Number of records to show on a page
    "allowPaging": true,          // If set to true, the component should display pager controls otherwise displays all records
    "pageControlLocation": "top", // "left", "right", "top", "bottom"
    "pageCssClasses": ["pagination", "pagination-v2"], // CSS classes to be applied to pagination controls
    "allowCustomPaging": true,  //Allows client code to load the records per page. Client will set number of pages.
    "pageChangeCallback": "callbackFunction" //pass page changed event / callback.
  },
  "sorting": {
    "allowStorting": true //If set to true, user should be able to toggle sort by clicking on header
  },
  "readOnly": false,  // If set to true, user should be able to sort the grid by clicking on header, Clicking twice should toggle the sort.
  "values": [], //JSON records to be disapled on the table
  "freeze": {
    "allowFreezing": false,  // true or false values to "Enalble/Disable" freezing globally
    "freezeRows": [], //row indexs to be freezed
    "freezeRowsFromTop": [], // number of rows to be freezed from top. Set 0 to disable freezing
    "freezeColumns": [] // column indexs to be freezed
  },
  "columnArray": [],
  "ui": {
    "cssSrc": "../assets/css/custom-style.css",
    "gridBgColor": "#f7f7f7", // Background color to be applied to the ReactGrid.
    "borderWidth": "1px",
    "borderColor": "#333",
    "fontSize": "14px",
    "cellSpacing":"0px",
    "cellpadding": "0px",
    "autoResize": true
  },
  "runtimeOptions": {
    "draggableColumns":true // Allow Drag and Drop of Columns.
  }
}

```

* QA
- Q:  The client load just the data shown on current page. Control will pass page changed event / callback.
- A: For demo purpose I've added the function `pageChangeCallbackHandler` in 'packages/react-data-grid-examples/src/scripts/react-grid-demo.js' & this prints the current page index in console whever pagechage occurs in pagination. ref: https://user-images.githubusercontent.com/3652329/31578087-db568f80-b137-11e7-85df-f4a380c0b693.png

