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

