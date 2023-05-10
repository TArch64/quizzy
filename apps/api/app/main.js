import express, {json} from 'express';
import {PrismaClient} from "@prisma/client";
import {App} from "./app.js";
import {Config} from "./core/config.js";
import {Logger} from "./core/logger.js";
import {QuizController} from "./quiz/quiz-controller.js";
import {NewQuizService} from "./quiz/services/new-quiz-service.js";
import {PlayQuizService} from "./quiz/services/play-quiz-service.js";
import {QuizQuestionController} from "./quiz/quiz-question-controller.js";

const config = new Config({ env: process.env });
const logger = new Logger();
const prisma = new PrismaClient();

const app = new App({
    server: express(),
    config,
    logger
});

app.useMiddleware(json());

const newQuizService = new NewQuizService({ prisma });
const playQuizService = new PlayQuizService({ prisma });
const quizController = new QuizController({ newQuizService, playQuizService });
app.useController(quizController);

const quizQuestionController = new QuizQuestionController({ playQuizService })
app.useController(quizQuestionController);

await prisma.$connect();
await app.start();
