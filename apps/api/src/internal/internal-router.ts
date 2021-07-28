import { Router } from "express";
import * as promClient from 'prom-client';

export const internalRouter = Router();


internalRouter.get("/is-alive", (req, res) => {
    res.send({ message: 'Alive' });
});

internalRouter.get("/is-ready", (req, res) => {
    res.send({ message: 'Ready' });
});
promClient.collectDefaultMetrics();
internalRouter.get("/prometheus", async (req, res) => {
    const metrics = await promClient.register.metrics();
    res.contentType(promClient.register.contentType);
    res.send(metrics);
});
