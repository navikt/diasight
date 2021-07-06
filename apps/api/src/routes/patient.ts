import express = require('express');
import smart = require('fhirclient');
import { smartSettings } from './constants';

export const patientRouter = express.Router();

patientRouter
  .route('/')
  .get((req, res) => {
    smart(req, res)
      .init({ ...smartSettings, redirectUri: '/' })
      .then(async (client) => {
        const data = await (client.patient.id
          ? client.patient.read()
          : client.request('Patient'));
        res.type('json').send(JSON.stringify(data, null, 4));
      });
  })
  .post((req, res) => {
    res.send('hi post /Patient');
  });

patientRouter
  .route('&_id=1')
  .put((req, res) => {
    res.send('hi put /Patient');
  })
  .delete((req, res) => {
    res.send('hi delete /Patient');
  });
