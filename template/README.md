Proem UI Framework
===========

This is a ReactJS project using:

* [Redux](http://redux.js.org/) - Maintains the state of the app.
* [Babel](https://babeljs.io/) - Compiles the app.
* [Webpack](https://webpack.github.io/) - Bundles the app. 
* [Jasmine](https://jasmine.github.io/) / [Karma](https://karma-runner.github.io) - Tests the app. 
* [Axios](https://github.com/mzabriskie/axios) - Makes promise base HTTP calls for the app. 
* [Material-ui](http://www.material-ui.com/) - Makes the app pretty.

#### Beginning Your App Reminders

Once you have proem running, you are ready to spin it off to make you own app. A reminder of some of the first things you'll want to do are:
 1. Do a project-wide search & replace on these to strings: `{{App Name}}` & `{{domain}}`
 1. Change the `name` in `package.json` (it's right at the top)
 1. Change the `/css/theme.js` to match you color palette/style.
 1. Generate some app specific icons/favicon. We suggest using the [RealFaviconGenerator](https://realfavicongenerator.net/) for this.
 1. Optionally, change the `OBJECT_KEY` and `TOKEN_KEY` in `utils/SessinUtils.js`.
 1. Replace this `README.md` with one specific for your project.

Run Project
---------------
If you have not done so already, run:
```shell
$ npm install
```

Once done, run:
```
$ npm start
``` 

This will build the project and start it in a browser.

Before committing any changes to your project, please run unit tests and lint to check for code compliance:
```shell
$ npm run test
$ npm run lint
```

Directory Layout
---------------
The web directory contains the web UI.

```shell
/
├── /actions/                   # Redux action function library
├── /components/                # Shared or generic UI components
│   └── /...                    # Each component should get its own folder (that matches the name of the component)
├── /pages/                     # React components for web pages
│   ├── /about/                 # About page
│   ├── /error/                 # Error page
│   ├── /home/                  # Home page
│   └── /...                    # etc.
├── /utils/                     # Utility and helper classes
│── index.html                  # React application entry point
│── package.json                # The list of project dependencies and NPM scripts
│── renderer.js                 # This root application script, will be bundled into `renderer-bundle.js` using webpack
│── store.js                    # The root Redux data store
└── webpack.*.js                # Bundling and optimization settings for Webpack
```

Getting Help
---------------
Guides, tutorials, and tips can be found on the [Proem-UI site](http://www.proemui.com/).
