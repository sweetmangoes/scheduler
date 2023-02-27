# Interview Scheduler

## Purpose 
 A single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. The front end of this project is built with React and makes requests to an [API](https://github.com/lighthouse-labs/scheduler-api) to fetch and store appointment data from a database.


![homepage](./docs/homepage.png)

### Features
You can edit, delete, cancel and create appointments. 
![Appointment](./docs/appointment-form.png)
![Features](./docs/delete-cancel-edit.png)



## Setup

- Install dependencies with `npm install`.

- Install [API repository](https://github.com/lighthouse-labs/scheduler-api) to run locally. 

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Technology 
- Front-End: React, Javascript
- Testing: StoryBook, Jest, Cypress
- Back-End: Javascript, PSQL

## Credit
This project was made based on the [boilerplate project](https://github.com/lighthouse-labs/scheduler/) made by [Francis Bourgouin](https://github.com/FrancisBourgouin) from [Lighthouse Labs](https://www.lighthouselabs.ca/). 
