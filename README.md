Weather Forecast App
=== 

Weather Forecast App is a user interface for city based weather reports created with [Vue.js](https://v2.vuejs.org/) and openweathermap.org api.

[Vuetify](https://vuetifyjs.com/) used as component library while creating the ui.

You can see live preview here: [Weather Forecast App](https://ssg-weather-app.netlify.app/)

## Prerequisites
You will need [Node.js](https://nodejs.org) version 6.0 or greater installed on your system.

## Setup

Get the code by either cloning this repository using git

    > git clone https://github.com/ssamilg/weather-forecast-app.git
... or [downloading source code](https://github.com/ssamilg/weather-forecast-app/archive/refs/heads/master.zip) code as a zip archive.

Once downloaded, open the terminal in the project directory, and continue with:
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Theoretical Questions

### Q:How would you take what is built here and turn it into an app for mobile?
A: I would choose React-Native for mobile version of this application. Basic js methods will remain same and user interface can recreate with react for mobile platforms. While designing the ui, I have tried to follow a mobile first approach. Interface has seperate components and more flexible and maintainable structure. It would be possible to implement these seperate ui components to React Native and use logic part mostly same with original vue application.