import * as express from 'express';
import { Message } from '@pasientjournal.no/api-interfaces';

const app = express();
import smart = require("fhirclient");
import session = require("express-session");
import Client from 'fhirclient/lib/Client';

app.use(session({
  secret: "my secret",
  resave: false, 
  saveUninitialized: false
}));

const greeting: Message = { message: 'Welcome to api!' };

const smartSettings = {
  clientId: "my-client-id", 
  redirectUri: "/app", 
  scope: "launch/patient patient/*.read openid fhirUser", 
  iss: "https://launch.smarthealthit.org/v/r2/sim/eyJrIjoiMSIsImIiOiJzbWFydC03Nzc3NzA1In0/fhir"
};

async function handler(client: Client, res) {
  const data = await (
    client.patient.id ? client.patient.read() : client.request("Patient")
  );
  console.log(client)
  res.type("json").send(JSON.stringify(data, null, 4));
}

app.get('/api', (req, res) => {
  res.send(JSON.stringify({message: "ola nordmann"}));
});

app.get("/launch", (req, res, next) => {
  smart(req, res).authorize(smartSettings).catch(next);
});

app.get("/api/app", (req, res) => {
  smart(req, res).ready().then(client => handler(client, res));
});

app.get("/", (req, res) => {
  smart(req, res)
    .init({ ...smartSettings, redirectUri: "/" })
    .then(client => handler(client, res));
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);