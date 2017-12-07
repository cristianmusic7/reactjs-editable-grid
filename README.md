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

If `npm link` fails with EPERM error, try executing it again (maybe 2 more times), or execute it with root/Adnimistrator.

Then run `my-demo` dev web server:

```
npm start
```


