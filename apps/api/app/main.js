import express, {json} from 'express';
import {App} from "./app.js";
import {Config} from "./config.js";
import {Logger} from "./logger.js";

const config = new Config({ env: process.env });
const logger = new Logger();

const app = new App({
    server: express(),
    config,
    logger
});

app.useMiddleware(json())
app.start();
