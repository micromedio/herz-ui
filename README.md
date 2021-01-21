# herz-ui

Herz UI (/hɛrʦ/ - Hérts) is a design system containing a styleguide(colors, grid, icons, typography) and library of UI components

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:6060](http://localhost:6060) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `styleguide/` folder. Also compiles the exported modules into `lib/` folder\
It correctly bundles React in production mode and optimizes the build for the best performance.


### `yarn compile`

Compile modules into the `lib/` folder to be exported and imported from this project.

## Developing

### Testing in another project

While developing you may want to test your changes in another project that has `herz-ui` as a dependency. To do that we can use `yarn link` to link your local version of `herz-ui` to your project.

One problem that can arise from that is that there will be two `react` versions running in your application, resulting in this error: [Invalid Hook Call Warning](https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react).

To fix this we need to not only link our local `herz-ui` to the other project, but also link `react` and `react-dom` from the other project to `hearz-ui`, so it uses those versions instead of the ones in `herz-ui` node_modules. The solution is [this](https://github.com/facebook/react/issues/13991#issuecomment-735945718):

1. In the external project folder run:
```
pushd node_modules/react && yarn link; popd
pushd node_modules/react-dom && yarn link; popd
```
2. In the `herz-ui` folder run:
```
yarn link
yarn link react && yarn link react-dom
```
3. In the external project folder run:
```
yarn link "@micromed/herz-ui"
```

Now the external project is using the local compiled version of `herz-ui` and there should be no react errors.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
