Weather Forecast App
=== 

Weather Forecast App is a user interface for city based weather reports created with [Vue.js](https://v2.vuejs.org/) and openweathermap.org api.

[Vuetify](https://vuetifyjs.com/) used as component library while creating the ui.

You can see live preview here: [Weather Forecast App](https://ssg-weather-app.netlify.app/)

## Project Standarts
* Projects name is Weather Forecast App, hence I have used 'WF' prefix for the custom components that I've created.
* In custom components style section, there is a wrapper div and an id given to this div as wrapper css. I use this method for overwriting Vuetify classes without scoping.

## Components
* **WFStepper**

    Main stepper component contains three basic components of the application.(WFForecastForm, WFForecastForm, WFForecastForm).

* **WFForecastForm**

    Simple form component that contains name and city fields expected from user.

* **WFSelfieStep**

    User can take photos until he choose to continue with one of them.

* **WFForecastTable**

    UI section that contains current, todays and weekly forecast components.

    Props

    | Name           | Type  | Description |
    |----------------|-------|-------------|
    | forecastData   |Object | The raw forecast data fetched from api|

* **WFCurrentWeatherSection**

    UI section that shows current time's weather data.

    Props

    | Name           | Type  | Description |
    |----------------|-------|-------------|
    | currentWeather |Object | First item of the weather data fetched from the api. Indicates weather report closest to current time|
    | forecastData   |Object | Processed and grouped version of api's forecast data|

* **WFTodaysWeatherSection**

    UI section that shows today's weather data with 3 hours of intervals.

    Props

    | Name           | Type  | Description |
    |----------------|-------|-------------|
    | currentWeather |Object | First item of the weather data fetched from the api. Indicates weather report closest to current time|
    | todaysForecast |Array  | The array that contains all weather data for the day with 3 hours of intervals |

* **WFWeeklyWeatherSection**

    UI section that shows 5 days of weather forecast report starting tomorrow for every day with 3 hours of intervals.

    Props

    | Name           | Type  | Description |
    |----------------|-------|-------------|
    | processedForecastData |Object | Processed and grouped version of api's forecast data|
    | forecastDays |Array  | The array that contains all dates for the fetched forecast data|


## Future Development Ideas
* An AI face detection plugin could be implemented to detect user faces while taking selfies inside app.
* App is only showing weather degrees right now, API has a lot of different data (humidity, wind etc.). These datas can be shown in a detailed view.
* Style optimizations can be made and dark mode could be added

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

### Q:How would you turn this into a module where the code is obfuscated?
A: Firstly, I would rewrite entry point of the app accordingly to a module. Then I would have to do necessary configurations on package.json to build app as a library.
I would use a code obfuscator library for obfuscation such as [webpack-obfuscator](https://www.npmjs.com/package/webpack-obfuscator).
