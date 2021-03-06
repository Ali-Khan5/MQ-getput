/**
 * Copyright 2018 IBM Corp.
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

// This is a demonstration showing the get operations onto a MQ Queue
// Using the MQI Node.js interface

// This application makes use of promises and libraries
// to factorise common boilerplate code.

// Import any other packages needed
var StringDecoder = require("string_decoder").StringDecoder;
var decoder = new StringDecoder("utf8");

// Set up debug logging options
var debug_info = require("debug")("sampleget:info");
var debug_warn = require("debug")("sampleget:warn");

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



var env = require("./env.json");
// important

var MQBoilerPlate = require("./boilerplate");

// define a simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to MQ - GET application app " });
  });

debug_info("Starting up Application");

function msgCB(md, buf) {
  debug_info("Message Received");
  console.log('Message Received')
  if (md.Format == "MQSTR") {
    var msgObject = null;
    try {
      msgObject = JSON.parse(buf);
      debug_info("JSON Message Object found", msgObject);
      console.log('Messages are :'+JSON.stringify(msgObject))
    } catch (err) {
        console.log('Messages Processed' +buf)
      debug_info("Not JSON message <%s>", decoder.write(buf));
    }
  } else {
    console.log('Messages  Processed: '+ buf)
    debug_info("binary message: " + buf);
  }
  // Keep listening
  return true;
}

function cycleEndpoint(index) {
  return (p = new Promise(function resolver(resolve, reject) {
    let mqBoilerPlate = new MQBoilerPlate();
    mqBoilerPlate
      .initialise("GET", index)
      .then(() => {
        debug_info("MQ Connection is established");
        console.log('MQ Connection is established')
        return Promise.resolve();
      })
      .then(() => {
        debug_info("Getting Messages");
        console.log('Getting Messages')
        return mqBoilerPlate.getMessages(null, msgCB);
      })
      .then(() => {
        debug_info("Waiting for termination");
        return mqBoilerPlate.checkForTermination();
      })
      .then(() => {
        mqBoilerPlate.teardown();
        console.log('Got the data')
        resolve();
      })
      .catch(err => {
        mqBoilerPlate.teardown();
        console.log('something happened !')
        resolve();
      });
  }));
}
// define a simple route
app.get("/get-data", (req, res) => {
    var promises = [];
    // Process each endpoint in turn
    env.MQ_ENDPOINTS.forEach((point, index) => {
        promises.push(cycleEndpoint(index));
    });
    // Wait for all the connections to the endpoints to report back
    Promise.all(promises).then(() => {
       res.json({ message: "Application GET Cycle Completed" });
      debug_info("Application Completed");
    });
  });



const port = process.env.PORT || 5050;
// listen for requests
app.listen(port, () => console.log(`Listening on port ${port}`));
