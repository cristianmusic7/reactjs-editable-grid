# react-grid plugin demo application

## Demo install & start:
The demo is created using `create-react-app` as the base

```sh
$ cd my-demo
$ npm install
$ npm start
```

## Config:
The config can be found in `src/config/gridConfig.json`
This file contains all the options required to configure the plugin.

## Plugin Demo

At first it's required to import the `ReactGrid` component in the application. Refer the code below to include the ReactGrid component. `src/App.js` demonstrates this.

```sh
import ReactGrid from './components/ReactGrid';

render() {
...
<ReactGrid 
config = {gridConfig}
/>
}
```


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
"freezeRowsFromTop": [], // number of rows to be freezed from top. Set 0 to disable freezing
"freezeColumns": [] // column indexs to be freezed
},
"columnArray": [], // Column configuration options. See below.
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

#### Columns Array :Header and footer data
The configuration options for the header & footer table cells can be found in this file:
 `src/assets/data/dataset.json`

The basic JSON fields are as follows: 

```json
id                     | description                                            |
-----------------------|--------------------------------------------------------|
"key"                  | Field from Values Array that needs to be displayed     |
"name"                 | Header Text: By default Field value,                   |
"alignment"            | Alignment body content                                 |
"headerAlignment"      | Header Alignment                                       |
"editItemTemaplate"    | "text": for textbox. Currently only support text,      |
                       |for "checkbox, combobox" component is required to be    |
                        build but new components is out of scope.               |
"width"                | width                                                  |
"resizable"            | resizable or not                                       |
"editable"             | Read Only : Make the column readonly                   |
"visible"              | Visible : true  / false                                |
"draggable"            | Draggable: whether column can be dragged               |
"locked"               | Freeze: set true to freeze column from scrolling       |
"footerText"           | Footer Text                                            |
"columnClass"          | Column Class                                           |
"footerStyle"          | Footer Style : CSS Classes                             |

```



* QA
- Q:  The client load just the data shown on current page. Control will pass page changed event / callback.
- A: For demo purpose I've added the function `pageChangeCallbackHandler` in 'packages/react-data-grid-examples/src/scripts/react-grid-demo.js' & this prints the current page index in console whever pagechage occurs in pagination. ref: https://user-images.githubusercontent.com/3652329/31578087-db568f80-b137-11e7-85df-f4a380c0b693.png

#### Styling header, footer & table:
The basic styling can be done using the config options from JSON file for advanced stying stylesheet should be used. For header, footer & table styling update the stylesheet `src/assets/css/custom-style.css` or add a new stylesheet

### Context Menu Configuration
The use of context menu for react-data-grid is demonstrated in `src/components/GridContextMenu.js` component.

The menu items are defined in the `render` function:
```jsx
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

The props `rowIdx` and `idx` are automatically updated with the clicked cell row and column index respectively when the menu is shown. These props can be used to customize menu items depending on the clicked cell/column header.

When column header is clicked the `this.props.rowIdx` will be equal `-1`.

The `GridContextMenu.js` file demonstrates changing Freeze column/row and Draggable column options at runtime.

For more details regarding configuration of menu items please see the Readme for [react-contextmenu](https://github.com/vkbansal/react-contextmenu) package.

#### Context Menu Styling
To configure styling for context menu please update the stylesheet at `src/assets/css/react-context-menu.css`

## Production Build
The demo can be optimized & built using the build command:

```sh
$ cd ~/my-demo
$ npm run build
```

the build is generated in `build` folder.
