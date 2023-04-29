import express, {json} from 'express';
import {Sequelize} from "sequelize";
import {App} from "./app.js";
import {Config} from "./core/config.js";
import {Logger} from "./core/logger.js";
import {QuizRepository} from "./quiz/quiz-repository.js";
import {QuizController} from "./quiz/quiz-controller.js";

const config = new Config({ env: process.env });
const logger = new Logger();

const sequelize = new Sequelize(config.sequelize);
const quizRepository = QuizRepository.create(sequelize);

const app = new App({
    server: express(),
    config,
    logger
});

app.useMiddleware(json());

const quizController = new QuizController({ quizRepository });
app.useController(quizController);

app.start();
