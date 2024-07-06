# React Project Manager + TypeScript + Vite

This project was bootstrapped with [Vite](https://vitejs.dev/).

- [React Project Manager Typescript Vite](#ols-react-challenge)
  - [In a nutshell](#in-a-nutshell)
  - [Usage](#usage)
    - [Development](#development)
      - [Env File](#env-file)
      - [Environment variables](#environment-variables)
  - [Technologies](#technologies)
    - [Testing framework](#testing-framework)
  - [Available Scripts](#available-scripts)
    - [`npm dev`](#npm-dev)
    - [`npm test`](#npm-test)
    - [`npm build`](#npm-build)
    - [`npm lint`](#npm-lint)
    - [`npm preview`](#npm-preview)
    - [`npm deploy`](#npm-deploy)
  - [More info](#more-info)
    - [React, Design, and Data Standards](#react,-design,-and-data-standards)
    - [Folder structure](#folder-structure)
    - [Deployment CI/CD](#deployment-ci/cd)
    - [Demo](#demo)

## In a nutshell

This app works as a handmade template for React Typescript.

- State management tool.

Design can be found in: [FIGMA Page](https://www.figma.com).

## Usage

### Development

#### Env File

You are going to need a `.env` file like this one:

```bash
VITE_API_HOSTNAME=http://your-api-url.com
```

#### Environment variables

- `VITE_API_HOSTNAME`: URL for React Base backend (React Base-backend project).

## Technologies

| **Tech**                                                  | **Description**                                                                                                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [React 18](https://facebook.github.io/react/)             | Fast, composable client-side components.                                                                                                                |
| [React Router 6](https://github.com/reactjs/react-router) | A complete routing library for React                                                                                                                    |
| [Zustand](https://zustand-demo.pmnd.rs/)                              | Enforces unidirectional data flows and immutable, hot reloadable store. Supports time-travel debugging.                                                 |
| [Vitest](https://vitest.dev/)                  | Automated tests with built-in expect assertions and [Enzyme](https://github.com/airbnb/enzyme) for DOM testing without a browser using Node.            |
| [ESLint](http://eslint.org/)                              | Lint JS. Reports syntax and style issues. Using [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb) for the airbnb style guides. |
| [SASS](http://sass-lang.com/)                             | Compiled CSS styles with variables, functions, and more.                                                                                                |
| Custom UI/CORE                                            | Custom UI/CORE is the components & styles library to build user interfaces                                                                              |

### Testing framework
React Testing Library [Testing Library documentation](https://testing-library.com/docs/)

## Available Scripts

In the project directory, you can run:

### `npm dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser env file config.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://vitejs.dev/guide/static-deploy.html) for more information.

## More info

### React, Design, and Data Standards
* Use shallow and only import the properties you need from zustand stores
* Do not disable compiler warnings on dependency arrays (unless absolutely necessary)
    - Also be specific about what you use in dependency arrays for hooks
* Functions and business logic should be pulled into their own hooks/services.
* Always handle undefined, don't default to empty objects
* Cleanup broadcast channels and listeners in hooks
* Eliminate unnecessary hooks [Read Here](https://react.dev/learn/you-might-not-need-an-effect)
* Learn More
	- You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
	- To learn React, check out the [React documentation](https://react.dev/).

### Naming Conventions
* kebab-case naming convention is used for folders and files
	- this means that spaces between words are replaced by a dash (e.g., folder-name, file-name.tsx)
* PascalCase naming convention is used for exports and enums keys
* Named exports should be used for functions and classes
	- e.g., rather than `export default Component` you should use `export { Component }`

### Date Standards
* We will utlize day.js for all date related functions [dayjs documentation](https://day.js.org/docs/en/parse/parse)
* Model property names will either specify Date or DateTime at the end of the name (e.g., activationDate vs createdDateTime)
* Model property data types will always be strings
* Date strings will be formated as YYYY-MM-DD (e.g., dayjs().format("YYYY-MM-DD") -> "2022-11-05")
* Datetime strings will be formatted as ISO8601 (e.g., dayjs().toISOString() -> "2022-11-05T14:48:00.000Z")

### CSS Standards
* Each component should have its own css module
	- Smaller sub-components may re-use the parent module
* common/sass/mixins
	- Collection of re-usable css properties for a single html tag
	- Should only be a single layer deep
	- Should be imported in other css modules files with @use
* common/sass/modules
	- Should be written as a regular css structure (not with @mixin)
	- Re-usable css to be applied to entire components (like forms or grids)
	- Can be any number of layers deep
	- Should be imported to components directly (not their css modules file)
* common/sass/styles
	- Singular css properties that should be applied uniformly across the app (colors, fonts, etc.)
	- z-index specifically should contain all z-indexes in use throughout the app, in order, for easy reference

### Testing Standards
* Each component should have its own test file
* **Automated testing**
	- Test user interactions
		- ex: opening/closing modals, user input validation, keyboard interactions, tooltips, etc.
	- Test hook based updates
		- ex: data manipulations, success/error banners,  etc.
	- Test function logic
- **Manual testing**
	- Verify functionality in dev environment (Ci1) before merging

#### React Testing Library Good-to-Knows
* Always use "GetBy..." methods (like GetByTestId) instead of "QueryBy...".
* Only use "QueryBy...." methods if we are trying to prove that an element does NOT exist.
* Don't use user.Type() method if the string to be typed is > 1 character.  
    - This can cause timeouts as each keystroke can trigger events.  Use user.Paste() instead.  
* Mock hooks in tests unless you are testing the hook itself

### Folder structure
```
├── dist                   # Compiled files (auto-generated)
├── node_modules            # Node libraries (auto-generated)
├── public                  # Config files, images
├── src                     # Source files
|   ├── common              # Reusable components (e.g., modals, styles, buttons, dropdowns...)
|   └── components
|       ├── body
|       |   ├── page        # Specific page of the app (e.g., user, role, project)
|       |        ├── components   # component/folder (e.g., project.tsx)
|       |        |    ├── sub-components   # sub-component(s)/folder(s) (e.g., reports.tsx)
|       |        |    ├── stylesheets      # styles for the component (e.g., reports.module.scss)
|       |        |    └── tests            # Unit testing (e.g., reports.test.tsx)
|       |        ├── stylesheets  # styles for the component (e.g., reports.module.scss)
|       |        └── tests        # Unit testing (e.g., reports.test.tsx)
|       └── other-layout-segments
|           └── components
|           ├── stylesheets  # styles for the component (e.g., reports.module.scss)
|           └── tests        # Unit testing (e.g., reports.test.tsx)
├── configuration-files
├── package.json
└── README.md
```
### Deployment CI/CD
* Github Actions
* Github Packages

### Demo:
