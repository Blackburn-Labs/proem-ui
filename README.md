Proem UI Framework
===========

This is a ReactJS project boilerplate. This includes, by default:

* [Redux](http://redux.js.org/) - Maintains the state of the app.
* [Babel](https://babeljs.io/) - Compiles the app.
* [Webpack](https://webpack.github.io/) - Bundles the app. 
* [Jasmine](https://jasmine.github.io/)/[Karma](https://karma-runner.github.io) - Tests the app. 
* [Axios](https://github.com/mzabriskie/axios) - Makes promise base HTTP calls for the app. 
* [Material-ui](http://www.material-ui.com/) - Makes the app pretty.

Developer Setup
---------------
The UI uses React as the JS framework, and Electron to package it as a Windows/Mac client. This means the app can be ran via the web browser, or as a desktop client. Support for Cordova coming very soon as well, to allow packaging as a mobile app.   

To get started, developers will need to install two things first:
 * [Git](https://git-scm.com/) - To pull the code down, though one could manually download it form GitHub too.
 * [Node](https://nodejs.org) - More specifically, the NPM (node package manager). Proem UI does not run on Node, but does use the NPM to make managing the 3rd party dependencies easier. 

### Clone and Run UI
To install and run the app:
```shell
### 1. Clone this repository
$ git clone https://github.com/rwblackburn/proem-ui.git your-project-name

### 2. Go into the app
$ cd your-project-name

### 3. Install dependencies
$ npm install

### 4. Start the webpack
$ npm start
``` 

This will run webpack (generating the `renderer-bundle.js` file). Just leave that running in your terminal, and the app will rebundle with every change (allowing for a faster development cycle).  Before committing any changes to your project, you will probably want to run lint to check for code compliance:
```shell
$ npm run lint
```

#### Running App
Typically during development you will just want to run the app in a web browser for easier testing. 
```shel
$ npm start
```

However, to open the app as a Windows/Mac app:
```shell
$ npm run start:client
```

When you are ready, package up the app as an executable using:
```shell
$ npm run build
```

### Directory Layout

The web directory contains the web UI.

```shell
/
├── /node_modules/              # 3rd party components (populated by npm install)
├── /actions/                   # Redux action function library
├── /components/                # Shared or generic UI components
│   └── /...                    # Each component should get its own folder (that matches the name of the component)
├── /pages/                     # React components for web pages
│   ├── /about/                 # About page
│   ├── /error/                 # Error page
│   ├── /home/                  # Home page
│   └── /...                    # etc.
├── /test/                      # Unit and integration tests
├── /utils/                     # Utility and helper classes
│── main.js                     # React application entry point
│── package.json                # The list of project dependencies and NPM scripts
│── renderer.js                 # This root application script, will be bundled
│── store.js                    # The root Redux data store
└── webpack.*.js                # Bundling and optimization settings for Webpack
```
### Beginning Your App
Once you have proem running, you are ready to spin it off to make you own app. A reminder of some of the first things you'll want to do are:
 1. Do a project-wide search & replace on these to strings: `{{App Name}}` & `{{domain}}`
 1. Change the `name` in `package.json` (it's right at the top)
 1. Change the `/css/theme.js` to match you color palette/style.
 1. Generate some app specific icons/favicon. We suggest using the [RealFaviconGenerator](https://realfavicongenerator.net/) for this.
 1. Optionally, change the `OBJECT_KEY` and `TOKEN_KEY` in `utils/SessinUtils.js`.
 1. Replace this `README.md` with one specific for your project.

## Appendix

### Tips/FAQ
Q) _I need to pass environment specific values to the app, such as my API's URL or the oAuth information. Where do I do that?_

A) **Check out the `webpack.\*.js files`. You can add environment specific settings there. For example, `webpack.local.js` contains the settings & environment variables for running the app locally.**

Q) _Best way to catch/display error messages?_

A) **The /pages/App.js has a global error message display. We are using [axios](https://github.com/mzabriskie/axios) for dispatching API calls. Therefore the app can watch for any errors in the /reducer/appStateReducer.js for any of your actions (anything that ends in `_REJECTED`) to catch and display any message there. However, each page should also handle specific errors themselves, to gracefully alter the display.**


### Other Resources
We pulled this boilerplate together from many sources over the years. One in particular is the [HTML5Boilerplate project](https://html5boilerplate.com/). This project no longer resembles that any longer, however we are big fans of that boilerplate and suggest anyone check it out. 

If you are new to React, I would suggest watching through these 14 videos on React & Flux by [LearnCode.academy](https://twitter.com/learncodeacad):
* [React JS Tutorial](https://youtu.be/MhkGQAoc7bc?list=PLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b)

After, I would also suggest take a look at these 7 videos on Redux within React, also by [LearnCode.academy](https://twitter.com/learncodeacad):
* [Redux Tutorial](https://youtu.be/1w-oQ-i1XB8?list=PLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b)


