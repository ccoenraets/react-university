# React University

React University is a sample project demonstrating how to build applications with React, Node.js, and the Lightning Design System. React University is written using ECMAScript 6 on the client and on the server (leveraging the new ES6 support of Node.js 4).

Check out this video for a quick walkthrough:

[![Video](http://img.youtube.com/vi/32Agr6QWmqU/0.jpg)](http://www.youtube.com/watch?v=32Agr6QWmqU)

The back-end is built with **Node.js** using a **Postgres** database. 

## Automatic Deployment to Heroku

1. Make sure you are logged in to the [Heroku Dashboard](https://dashboard.heroku.com)

1. Click the Button below to deploy the application on Heroku.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Your own instance of the application is automatically deployed, and your own Postgres database is populated with sample data.

## Local Installation

Follow the instructions below if you prefer to install the application on your local machine:

1. Install the latest version of [Node.js](https://nodejs.org). This application requires Node.js 4.x.

1. Install [Postgres](http://www.postgresql.org/) locally 

1. Start Postgres and create a database called **university**.

1. Clone this repository or download and unzip [this](https://github.com/ccoenraets/react-university/archive/master.zip) zip file.

1. Navigate to the **react-university** directory and install the project dependencies:

    ```
    npm install
    ```

1. Open **server/config.js** and make sure the **databaseURL** matches your configuration (use your user name)

1. Type the following command to build the client application:

    ```
    npm run webpack
    ```
    
    The project is written using ECMAScript 6 including ECMAScript 6 modules.

1. Type the following command to start the server:
    
    ```
    npm start
    ```
    
    The database is automatically populated
    
1. Open a browser and access [http://localhost:5000](http://localhost:5000)