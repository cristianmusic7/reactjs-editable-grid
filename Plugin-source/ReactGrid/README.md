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
The plugin configuration options can be found in `gridConfig.json` `~/packages/react-data-grid-examples/src/assets/gridConfig.json`
This file contains all the options required to configure the plugin.

### Header and footer data
The configuration options for the header & footer table cells can be found in this file:
 `~\ReactGrid\packages\react-data-grid-examples\src\assets\data\dataset.json`

The basic JSON fields are as follows: 

```json
id                     | description                                            |
-----------------------|--------------------------------------------------------|
"key"                  | Field from Values Array that needs to be displayed     |
"name"                 | Header Text: By default Field value,                   |
"alignment"            | Alignment body content                                 |
"headerAlignment"      | Header Alignment                                       |
"editItemTemaplate"    | "text": for textbox currently only support text,       |
                       |for "checkbox, combobox" component is required to be    |
                        build but that is out of scope. Ref: forum              |
"width"                | width                                                  |
"resizable"            | resizable or not                                       |
"editable"             | Read Only : Make the column readonly                   |
"visible"              | Visible : true  / false                                |
"draggable"            | Draggable: whether column can be dragged               |
"locked"               | Freeze: set true to freeze column from scrolling       |
"footerText"           | Footer Text                                            |
"columnClass"          | Column Class                                           |
"footerStyle"          |  Footer Style : CSS Classes                            |

```



* QA
- Q:  The client load just the data shown on current page. Control will pass page changed event / callback.
- A: For demo purpose I've added the function `pageChangeCallbackHandler` in 'packages/react-data-grid-examples/src/scripts/react-grid-demo.js' & this prints the current page index in console whever pagechage occurs in pagination. ref: https://user-images.githubusercontent.com/3652329/31578087-db568f80-b137-11e7-85df-f4a380c0b693.png

#### Styling header and footer:
The basic styling can be done using the config options from JSON file for advanced stying stylesheet should be used. For header and footer styling update the stylesheet `~\ReactGrid\packages\react-data-grid-examples\src\sassets\css\custom-style.css`

### Context Menu Configuration
To display context menu for cells or column headers, define the component for the menu.

First import the ContextMenu and MenuItem from `react-data-grid-addons`:
```javascript
const { Menu: { ContextMenu, MenuItem } } = require('@knd/react-grid/packages/react-data-grid-addons/dist/react-data-grid-addons');
```

Then implement the context menu component with the `render` function returning the context menu structure. For example:

```jsx
export default class GridContextMenu extends React.Component {
  
  //...

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
```

Then when creating the `react-data-grid` component, set its `contextMenu` prop to the instance of the context menu component defined above. For example:

```jsx
    <ReactDataGrid
        ...
        contextMenu={<GridContextMenu onFreezeColumn={this.onFreezeColumn} onFreezeRows={this.onFreezeRows}
            columnGetter={this.columnGetter} onSetColumnDraggable={this.onSetColumnDraggable} />}
```

The props `rowIdx` and `idx` in the menu component are automatically updated with the clicked cell row and column index respectively when the menu is shown. These props can be used to customize menu items depending on the clicked cell/column header.

When column header is clicked the `this.props.rowIdx` will be equal `-1`.

For more details regarding configuration and styling of menu items please see the Readme for [react-contextmenu](https://github.com/vkbansal/react-contextmenu) package.


## Plugin Demo

At first it's required to import the `ReactGrid` plugin in the application. Refer the code below to include the ReactGrid plugin

```sh
import ReactGrid from '../components/ReactGrid';

render() {
...
<ReactGrid 
config = {gridConfig}
/>
}
```


Refer this file `~/ReactGrid/packages/react-data-grid-examples/src/scripts/react-grid-demo.js` for more detials


### Plugin configuration options
Following data structure has been used for column data:


```json
const gridConfig = {
"pagination": {
"pageSize": 10,               // Number of records to show on a page
"allowPaging": true,          // If set to true, the component should display pager controls otherwise displays all records
"pageControlLocation": "top-right", // "top-left", "top-right", "bottom-left", "bottom-right"
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

configuration file path: `~/ReactGrid/packages/react-data-grid-examples/src/assets/gridConfig.json`

* QA
- Q:  The client load just the data shown on current page. Control will pass page changed event / callback.
- A: For demo purpose I've added the function `pageChangeCallbackHandler` in 'packages/react-data-grid-examples/src/scripts/react-grid-demo.js' & this prints the current page index in console whever pagechage occurs in pagination. ref: https://user-images.githubusercontent.com/3652329/31578087-db568f80-b137-11e7-85df-f4a380c0b693.png

