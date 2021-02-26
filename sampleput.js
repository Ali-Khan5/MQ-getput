/**
 * Copyright 2019 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

// This is a demonstration showing the put operations onto a MQ Queue
// Using the MQI Node.js interface

// This application makes use of promises and libraries
// to factorise common boilerplate code.

// Set up debug logging options
var debug_info = require("debug")("sampleput:info");
var debug_warn = require("debug")("sampleput:warn");

var MQBoilerPlate = require("./boilerplate");

const express = require("express");
const bodyParser = require("body-parser");
// create express app
const app = express();
const cors = require("cors");
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
//
app.use(express.static(__dirname + "/public"));

//for cors
app.use(cors());
app.options("*", cors());

var mqBoilerPlate = new MQBoilerPlate();

// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MQ - PUT application app " });
});


app.get("/send-data", (req, res) => {
  debug_info("Starting up Application");

  mqBoilerPlate
    .initialise("PUT")
    .then(() => {
      debug_info("MQ Connection is established");
      console.log("MQ Connection is established");
      return Promise.resolve();
    })
    .then(() => {
      var msgObject = {
        Greeting: "Hello from Node at " + new Date()
      };
      var msg = JSON.stringify(msgObject);
      debug_info("Writing Message");
      console.log("Writing Message");
      return mqBoilerPlate.putMessage(msg);
    })
    .then(data => {
      console.log('Data has sent to the MQ server !!');
      mqBoilerPlate.teardown();
      res.json({ message: "data has been sent " + data });
    })
    .catch(err => {
      mqBoilerPlate.teardown();
      res.json({ message: "something happened" });
    });

  debug_info("Application Completed");
});

const port = process.env.PORT || 5000;
// listen for requests
app.listen(port, () => console.log(`Listening on port ${port}`));
