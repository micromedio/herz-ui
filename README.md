# herz-ui

> Herz UI (/hɛrʦ/ - Hérts) is an implementation of UI Components based on Micromed's design system called **Herz**

## Table of Contents

* ### [Installation](#installation)
* ### [Want to Contribuite](#contribute)
* ### [Getting started](#starting)
* ### [Testing in another project](#testlocally)
<br/>

## <a name="installation"></a> Installation

### Using Herz-UI in your project

You can easily install in your project using your favorite package manager

```
// using npm
npm i @micromed/herz-ui

// using yarn
yarn add @micromed/herz-ui
```

you'll find our component documentation on our [website](https://herz-ui.micromed.io/)

## <a name="contribute"></a> Want to contribute?
If you found a bug, have issues or feature proposals, feel free to open an Issue or send us a Pull Request, you can also read more about our [contribution guidelines](https://github.com/micromedio/herz-ui/blob/master/CONTRIBUTING.md)
## <a name="starting"></a>Getting started
<br/>

### **Setup**

clonning the repo
```
git clone https://github.com/micromedio/herz-ui.git
cd herz-ui
```

installing dependencies with yarn
```
yarn 
```

### **Running in development:**

```
yarn dev
```

- Runs the app in the development mode.

- The page will reload if you make edits.

- You will also see any lint errors in the console

- Project will be available at [localhost:6060](http://localhost:6060)
<br/><br/>

### **Building for production**

```
yarn build
```
- Builds the app for production to the styleguide/ folder
- Compiles the exported modules into lib/ folder
- bundles react in production mode optimizing for best performance
<br/><br/>

### **Testing**
```
yarn test
```
- Launches the test runner in the interactive watch mode.
<br/><br/>

```
yarn build-storybook
```
- Build storybook as a static project
<br/><br/>

```
yarn storybook
```
- Runs storybook at [localhost:6006](http://localhost:6006)

<br/><br/>

## <a name="testlocally"></a>Testing in another project

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
