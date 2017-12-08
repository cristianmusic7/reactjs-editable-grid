# ReactGrid Plugin and Demo

`Plugin-source` contains the source deployed on npm  https://www.npmjs.com/package/@sans/react-data-grid.

`my-demo` contains demo project using @sans/react-data-grid

## Deployment

To deploy `my-demo` for testing with local `@sans/react-data-grid` module (from `Plugin-source/ReactGrid` folder) run the following commands:

```
cd Plugin-source/ReactGrid
npm install
./node_modules/.bin/lerna bootstrap
npm run build

cd ../../my-demo
npm install

# now use 'npm link' to link to local '@sans/react-data-grid' package instead of loading from npmjs.
npm link ../Plugin-source/ReactGrid
```

If `npm link` fails with EPERM error, try executing it again (maybe 2 more times), or execute it with root/Administrator.

Then run `my-demo` dev web server:

```
npm start
```

## React​ ​JS​ ​Grid​ ​Enhancements

## Requirement​ ​1

In order to add editable ComboBox or Checkbox columns you have to add the itemType property to the column data config on the "dataset.json" file: 

```
"itemType": "Combo" for ComboBox
"itemType": "CheckBox" for checkBox
"itemType": "Custom" for the custom edit type created for requirement 2.
```

## Requirement​ ​2

For this requirement a custom edit type was created, in order to give an example of how this can be done. 

Two new files were created for this purpose "CustomEditorFormatter.js" and "CustomEditor.js" on the componenents folder. The first file declares the format in which the cell is displayed inside the cell, and the second file declares what is displayed when you double clicked the cell and show the inputs.

Inside those components you can follow the comments, which indicate what the code is doing through the file.

Both are imported on the ReactGrid component and are added to all the columns with itemType "Custom".

In order to create your own custom edit type you can use this file as a template and edit the code and the render function to include your html and returning values.

## Requirement​ ​4

Functionality implemented to perform separately the generating of the fake data and the render of it, with react data grid.

You have to generate the data first before render it on the grid. The render button is enabled each time the data is generated.

You can perform tests, changing the number of rows and columns, and seeing the time taken for each test. For this you have to enable the `performanceTest` flag. You can find it on the App.js file:


```
const performanceTest = true;   //value changed
```

The time that it takes to render depends of the proccesing power of the computer, although it always takes more time proportional with the number of columns (more columns, more time), the rows have little less affection on the time it takes to render, due to it seems that the library is optimized for render rows, that is why it has to do more scripting work as seen on performance test with the performance tab in chrome.

Related to the generating of data the time it takes is related with both number of columns and rows, it takes for time performing the scripts in relation with how large are those numbers.


## Files Added/Updated:

### Demo:

-App.js --- Code functionality implemented to perform separately the generating of the fake data and the render of it.

-Components/ReactGrid.js --- Imports DropDownEditor(ComboBox cells) and checkboxEditor (files taken from the plugin source) and the customEditor  created to give an example of how this can be used.

-Components/CustomEditor.js  --- File declaring the format in which the cell is displayed inside the cell.

-Components/CustomEditorFormatter.js --- File declaring what is displayed when you double clicked the cell and show the inputs on the "edition" mode.

### Plugin Source

-Packages/react-data-grid/src/editors/CheckboxEditor --- File that is imported on the reactData.js, it declares the checkboxEditor, file originally bundled on the library, updated some lines in order to fix some warnings.

-Packages/react-data-grid-addons/src/editors/DropDownEditor --- File that is imported on the reactData.js, it declares the DropDownEditor(ComboBoxEditor) file originally bundled on the library.

Comments were added on the new code on this files in order to get you an idea of what is happening on these files.

