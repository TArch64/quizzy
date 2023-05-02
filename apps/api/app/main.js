import express, {json} from 'express';
import {Sequelize} from "sequelize";
import {App} from "./app.js";
import {Config} from "./core/config.js";
import {Logger} from "./core/logger.js";
import {QuizController} from "./quiz/quiz-controller.js";
import {QuizRepository} from "./quiz/repositories/quiz-repository.js";
import {QuizAnswerRepository} from "./quiz/repositories/quiz-answer-repository.js";
import {QuizQuestionRepository} from "./quiz/repositories/quiz-question-repository.js";
import {NewQuizService} from "./quiz/services/new-quiz-service.js";

const config = new Config({ env: process.env });
const logger = new Logger();

const sequelize = new Sequelize(config.sequelize);
const quizRepository = QuizRepository.create(sequelize);
const quizQuestionRepository = QuizQuestionRepository.create(sequelize);
const quizAnswerRepository = QuizAnswerRepository.create(sequelize);

quizRepository.relations({ questions: quizQuestionRepository });
quizQuestionRepository.relations({ quizzes: quizRepository, answers: quizAnswerRepository });
quizAnswerRepository.relations({ questions: quizQuestionRepository });

const app = new App({
    server: express(),
    config,
    logger
});

app.useMiddleware(json());

const newQuizService = new NewQuizService({
    logger,
    quizRepository,
    quizQuestionRepository,
    quizAnswerRepository,
});

const quizController = new QuizController({
    quizRepository,
    newQuizService
});

app.useController(quizController);

app.start();
